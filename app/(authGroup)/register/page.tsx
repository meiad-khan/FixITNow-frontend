import RegisterForm from "../_components/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-b-lg border p-8 shadow-lg">
          {/* Form generic texts */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome to FixIT Now!</h1>
            <p className="text-gray-500">
              Create an accound to unlock access to FixIT Now
            </p>
          </div>
          {/* Form */}
          <RegisterForm/>
        </div>
      </div>
    </>
  )
}
