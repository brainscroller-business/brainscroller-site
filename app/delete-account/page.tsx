export default function DeleteAccountPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full p-8 border border-zinc-700 rounded-xl bg-zinc-900">
        <h1 className="text-2xl font-semibold text-amber-300 mb-4">
          Delete Your BrainScroller Account
        </h1>

        <p className="text-sm text-zinc-300 mb-4">
          You can delete your BrainScroller account at any time using the steps below.
        </p>

        <ol className="list-decimal list-inside text-sm text-zinc-300 space-y-2 mb-6">
          <li>Open the BrainScroller app.</li>
          <li>Go to profile → settings.</li>
          <li>Tap <strong>Delete Account</strong>.</li>
          <li>Confirm deletion.</li>
        </ol>

        <p className="text-sm text-zinc-400 mb-4">
          Account deletion is permanent. Your saved library, account info,
          and associated data will be removed.
        </p>

        <h2 className="text-lg font-semibold mt-6 text-zinc-200">If you cannot access the app</h2>

        <p className="text-sm text-zinc-200 mt-2">
          Send an email request from your registered email address to:
        </p>

        <p className="text-sm font-mono text-amber-300 mt-2">
          support@brainscroller.com
        </p>
      </div>
    </main>
  );
}
