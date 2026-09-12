import { useRef, useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { verifyOtp } from "../../services/authApi";
import { useNavigate } from "react-router-dom";

export default function Otp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const [error, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const email = sessionStorage.getItem("signupEmail");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  /*
   * Handle OTP input
   */
  const handleOtpChange = (index: number, value: string) => {
    // Remove anything that isn't a number
    const numericValue = value.replace(/\D/g, "");

    if (!numericValue) {
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);
      return;
    }

    const updatedOtp = [...otp];

    // Only keep one digit
    updatedOtp[index] = numericValue.slice(-1);

    setOtp(updatedOtp);

    // Move to next input
    if (index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /*
   * Handle keyboard navigation
   */
  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Move backwards when deleting an empty input
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Arrow left
    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Arrow right
    if (event.key === "ArrowRight" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /*
   * Handle OTP paste
   */
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, otp.length);

    if (!pastedValue) {
      return;
    }

    const newOtp = [...otp];

    pastedValue.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    // Focus the last populated box
    const nextIndex = Math.min(pastedValue.length, otp.length - 1);

    inputRefs.current[nextIndex]?.focus();
  };

  /*
   * Verify OTP
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors("");

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 5) {
      setErrors("Please enter the 5-digit verification code.");
      return;
    }

    if (!email) {
      setErrors(
        "We couldn't determine the account being verified. Please sign up again.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await verifyOtp(email, enteredOtp);

      // OTP is no longer needed after successful verification
      sessionStorage.removeItem("signupEmail");
      navigate("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to verify your account.";
      setErrors(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            Confirm your Zend account
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#a3a3a3]">
            We've sent a 5-digit verification code to your Email Address. Enter
            the code below to continue.
          </p>
        </div>

        {/* OTP Form */}
        <form onSubmit={handleSubmit}>
          {/* Error message */}
          {error && (
            <div className="mb-5 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          {/* OTP Inputs */}
          <div className="flex gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={1}
                value={digit}
                onChange={(event) => handleOtpChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                onPaste={handlePaste}
                aria-label={`OTP digit ${index + 1}`}
                className="h-16 w-14 border border-[#303030] bg-[#0a0a0a] text-center text-2xl font-semibold text-white outline-none transition-colors focus:border-white sm:h-16 sm:w-16"
              />
            ))}
          </div>

          {/* Verify */}
          <button
            type="submit"
            className="mt-7 w-full bg-white py-3.5 text-base font-semibold text-black transition-colors hover:bg-[#d9d9d9] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Verifying..." : "Verify account"}

          </button>
        </form>

        {/* Resend */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#777]">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="text-white transition-colors hover:underline"
            >
              Resend OTP
            </button>
          </p>
        </div>

        {/* Back to Login */}
        <div className="mt-5 border-t border-[#262626] pt-5 text-center">
          <button
            type="button"
            className="text-sm text-[#777] transition-colors hover:text-white"
          >
            ← Back to login
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
