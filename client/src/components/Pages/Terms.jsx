// In client/src/components/Pages/Terms.jsx
export default function Terms() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Acceptance of Terms</h2>
          <p className="text-zinc-300">
            By accessing and using Axon, you accept and agree to be bound by these Terms of Service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Use of Service</h2>
          <p className="text-zinc-300">
            You may use this service for lawful purposes only. You are responsible for your use of the service
            and any content you create.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Limitation of Liability</h2>
          <p className="text-zinc-300">
            This service is provided "as is" without warranties of any kind.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Contact</h2>
          <p className="text-zinc-300">
            Questions about these Terms? Contact: your-email@gmail.com
          </p>
        </section>

        <p className="text-zinc-500 text-sm mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}