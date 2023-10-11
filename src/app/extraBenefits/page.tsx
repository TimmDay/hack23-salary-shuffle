"use client";

import Link from "next/link";

export default function ExtraSuperBenefits() {
  return (
    <div>
      <h1>Some Perks of Saving for Retirement within Super</h1>

      <div>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.ato.gov.au/individuals/super/what-is-super/"
        >
          ATO: What is super?
        </Link>
      </div>

      <ul>
        <li>
          Contributions are taxed at a lower rate than normal income (for an
          instant tax saving of "your marginal rate" - 15%)
        </li>
        <li>
          Earnings within the fund (dividends and distributions) are entirely
          tax-free (instead of being taxed as income).
        </li>
        <li>
          It is hard to get it out early. (You can't sell it all on a whim, and
          scammers or dodgy uncles can't get at it.)
        </li>
        <li>
          Markets, house prices, bitcoins are unpredictable. Tax savings are
          instant and guaranteed.
        </li>
      </ul>
      <p>It will compound faster, in a tax-advantaged secure environment.</p>

      <div>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.ato.gov.au/individuals/super/withdrawing-and-using-your-super/super-withdrawal-options/?anchor=Preservationage#Preservationage"
        >
          ATO: Preservation Age
        </Link>
      </div>
    </div>
  );
}
