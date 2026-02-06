export default function Privacy() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
          <p className="text-zinc-300">
            We collect your email address and profile information when you sign in with Google.
            We also store your conversations to provide you with chat history.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
          <p className="text-zinc-300">
            Your information is used solely to provide and improve our service.
            We do not sell or share your data with third parties.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Contact</h2>
          <p className="text-zinc-300">
            For questions about this Privacy Policy, contact us at: your-email@gmail.com
          </p>
        </section>

        <p className="text-zinc-500 text-sm mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}