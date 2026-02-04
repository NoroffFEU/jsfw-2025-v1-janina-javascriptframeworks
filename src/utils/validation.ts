export type ContactValues = {
  fullName: string;
  subject: string;
  email: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};

  if (values.fullName.trim().length < 3) {
    errors.fullName = "Full name must be at least 3 characters.";
  }

  if (values.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters.";
  }

  if (!isValidEmail(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}
