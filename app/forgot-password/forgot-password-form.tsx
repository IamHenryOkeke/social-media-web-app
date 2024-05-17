'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { sendResetMail } from '../lib/actions';

export default function ForgotPasswordForm() {
  const [state, action] = useFormState(sendResetMail, undefined);

  return (
    <form action={action} className="mx-auto w-[90%] md:w-3/5 lg:w-2/5 flex flex-col items-center justify-center gap-2">
      <div className="w-full flex flex-col items-center gap-2">
        <label className="self-start font-semibold" htmlFor="email">Email</label>
        <input className="w-full text-black focus:outline-none p-3 border border-gray-700 rounded-md" id="email" name="email" type="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p className="text-sm text-red-500 self-start">{state.errors.email}</p>}
      <ResetButton />
      {state?.error && <p className="text-red-500">{state?.error}</p>}
    </form>
  );
}

function ResetButton() {
  const { pending } = useFormStatus();

  return (
    <button className="w-full my-2 p-3 rounded-md font-bold hover:bg-slate-500/80 bg-slate-500" aria-disabled={pending} type="submit">
      {pending ? 'Sending reset email...' : 'Send reset email'}
    </button>
  );
}
