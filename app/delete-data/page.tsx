export default function DataDeletionPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full p-8 border border-zinc-700 rounded-xl bg-zinc-900">
        <h1 className="text-2xl font-semibold text-amber-300 mb-4">
          Request Data Deletion
        </h1>

        <p className="text-sm text-zinc-300 mb-4">
          If you want specific personal data removed without closing your
          account, email us using the email address linked to your account.
        </p>

        <p className="text-sm font-mono text-amber-300 mb-6">
          support@brainscroller.com
        </p>

        <p className="text-xs text-zinc-500">
          We will verify ownership of the account and remove the requested
          information in accordance with our Privacy Policy.
        </p>
      </div>
    </main>
  );
}
