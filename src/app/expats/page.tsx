"use client";

import Link from "next/link";

export default function Expats() {
  return (
    <div>
      <h1>Retiring Overseas</h1>
      <p>Retiring outside of Australia?</p>
      <p>
        If you are (or will be) an Australian Citizen or Permanent Resident by
        the time you retire, you just need to nominate a bank account and you
        will receive super payments the same as anybody living in Australia
        would.
      </p>
      <p>
        You still need to meet the same requirements as if you were living in
        Australia - at least 60 years of age and retired.
      </p>

      <div>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.ato.gov.au/Individuals/Jobs-and-employment-types/Working-as-an-employee/Leaving-the-workforce/Accessing-your-super-to-retire/#Whenyoucanaccessyoursuper"
        >
          ATO: Accessing Super when you retire
        </Link>
      </div>

      <div>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.ato.gov.au/individuals/super/withdrawing-and-using-your-super/super-withdrawal-options/?anchor=Preservationage#Preservationage"
        >
          ATO: Preservation Age
        </Link>
      </div>

      <p>
        If you leave Australia to retire elsewhere, and do not have (or
        renounce) Aussie citizenship/PR, you can get your super back early but
        with significant tax penalties (35% or more).
      </p>

      <div>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.ato.gov.au/Individuals/Super/Temporary-residents-and-superannuation/Departing-Australia-superannuation-payment-DASP/"
        >
          ATO: Departing Australia Super Payment (DASP)
        </Link>
      </div>
    </div>
  );
}
