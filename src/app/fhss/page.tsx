"use client";

import Link from "next/link";

export default function FHSS() {
  return (
    <div>
      <h1>FHSS</h1>
      <p>
        The First Home Super Saver Scheme is a tax advantaged way to save for a
        deposit on your first home, so you can get there quicker.
      </p>
      <p>
        If you voluntarily contribute savings into super (i.e Salary Sacrifice
        or Personal Contributions - the employer SG contributions made on your
        behalf are NOT eligible for FHSSS) you can get some of it out early to
        buy your first home.
      </p>
      <ul>
        <li>You have not used FHSSS before (it's a one time thing).</li>
        <li>You are a first home buyer.</li>
        <li>
          You have never owned property in Australia before (including
          investment property).
        </li>
        <li>
          Up to only $15,000 (of voluntary contributions) from a single
          financial year can be eligible. You will get 85% of that amount.
        </li>
        <li>
          Up to a total of only $50,000 can be taken out. So you would need
          heavy Salary Sacrificing for at least 4 years to get the maximum
          benefit.
        </li>
        <li>
          If you don't sign a contract to build or construct a home within 12
          months, you get in trouble and have to put the money back into super.
        </li>
        <li>The home must be in Australia.</li>
        <li>
          There are changes coming to the scheme in 2024, so the above may
          update soon.
        </li>
        <li>For our Kiwi friends - Kiwi Saver contributions can count!</li>
      </ul>

      <div>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.ato.gov.au/Individuals/Super/Withdrawing-and-using-your-super/First-Home-Super-Saver-Scheme/"
        >
          ATO: First home super saver scheme
        </Link>
      </div>
    </div>
  );
}
