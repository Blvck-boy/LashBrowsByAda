const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export interface BookingPayload {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  services: {
    lash: { id: string; name: string; price: number } | null;
    brow: { id: string; name: string; price: number } | null;
    extras: { id: string; name: string; price: number }[];
  };
  date: string;
  time: string;
  totalAmount: number;
}

export interface TraineePayload {
  name: string;
  email: string;
  phone: string;
  experienceLevel: string;
}

export interface BookingResponse {
  message: string;
  booking: string;
  paymentUrl: string;
  reference: string;
}

export interface TraineeResponse {
  message: string;
  trainee: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    experienceLevel: string;
    role: string;
    registeredAt: string;
  };
}

// Booking APIs
export const bookingAPI = {
  async createBooking(data: BookingPayload): Promise<BookingResponse> {
    const response = await fetch(`${API_BASE}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create booking');
    }

    return response.json();
  },

  async getBooking(id: string) {
    const response = await fetch(`${API_BASE}/api/bookings/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch booking');
    }

    return response.json();
  },

  async listBookings() {
    const response = await fetch(`${API_BASE}/api/bookings`);

    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }

    return response.json();
  },
};

// Trainee APIs
export const traineeAPI = {
  async registerTrainee(data: TraineePayload): Promise<TraineeResponse> {
    const response = await fetch(`${API_BASE}/api/trainees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to register trainee');
    }

    return response.json();
  },

  async listTrainees() {
    const response = await fetch(`${API_BASE}/api/trainees`);

    if (!response.ok) {
      throw new Error('Failed to fetch trainees');
    }

    return response.json();
  },
};
