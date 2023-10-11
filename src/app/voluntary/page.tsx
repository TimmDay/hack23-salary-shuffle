"use client";

import Link from "next/link";

export default function VoluntaryContributions() {
  return (
    <div>
      <h1>Personal Contributions</h1>
      <p>
        Maybe you have some windfall, or have decided to move your house deposit
        savings into super to take advantage of the FHSSS.{" "}
      </p>
      <p>Awesome! There are significant tax savings in your future.</p>
      <p>
        But there is a process. There are some steps and it is possible to muck
        them up.
      </p>
      <ul>
        <li>
          You pay some money into your super fund voluntarily (this is after-tax
          money)
        </li>
        <li>
          Your super fund will deduct 15% from it for the contributions tax
        </li>
        <li>
          You are now eligible to claim back your income tax that was paid on
          that money before you put it in the fund! But
        </li>
        <li>
          You have to send a letter (in an envelope) to your super fund at least
          2 weeks before the end of financial year
        </li>
        <li>
          That letter will contain a Notice of Intent to Claim form () that must
          be filled out correctly
        </li>
        <li>
          If you forget the letter, you can't claim the tax back. And end up
          paying extra tax.
        </li>
        <li>You will get the refund as part of your normal tax return</li>
      </ul>

      <div>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.ato.gov.au/individuals/super/growing-and-keeping-track-of-your-super/how-to-save-more-in-your-super/personal-super-contributions/"
        >
          ATO: Voluntary Contributions
        </Link>
      </div>

      <div>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.ato.gov.au/Forms/Notice-of-intent-to-claim-or-vary-a-deduction-for-personal-super-contributions/"
        >
          ATO: Notice of Intent to Claim Form
        </Link>
      </div>
    </div>
  );
}
