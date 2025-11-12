import mongoose, { Document, Model, Schema, Types } from "mongoose";

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          // Email validation regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please provide a valid email address",
      },
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Index on eventId for faster queries when fetching bookings by event
BookingSchema.index({ eventId: 1 });

/**
 * Pre-save hook to validate that the referenced event exists
 * Prevents orphaned bookings by ensuring eventId references a valid Event document
 */
BookingSchema.pre("save", async function (next) {
  // Only validate eventId if it's new or modified
  if (this.isNew || this.isModified("eventId")) {
    try {
      // Import Event model dynamically to avoid circular dependencies
      const Event = mongoose.models.Event || (await import("./event.model")).default;
      
      // Check if the event exists
      const eventExists = await Event.exists({ _id: this.eventId });
      
      if (!eventExists) {
        return next(new Error("Referenced event does not exist"));
      }
    } catch (error) {
      return next(
        error instanceof Error ? error : new Error("Error validating event reference")
      );
    }
  }

  next();
});

// Export model, reusing existing model if it exists (prevents OverwriteModelError in development)
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
