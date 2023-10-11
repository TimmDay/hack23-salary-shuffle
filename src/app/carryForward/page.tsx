"use client";

import Link from "next/link";

export default function CarryForward() {
  return (
    <div>
      <h1>Carry Forward Contributions</h1>
      <p>
        It is possible to bump up the $27500 concessional contributions cap a
        bit IF you didn't max it out for all of the last 5 years.
      </p>
      <p>
        IF by some stroke of good fortune, you have the means to be able to
        contribute MORE than the $27500 concessional contributions cap into your
        super fund in a single financial year,
      </p>
      <p>Congrats! But check that you can first</p>

      <h3>How to Check</h3>
      <ul>
        <li>log in to MyGov</li>
        <li>Go to the ATO tax portal</li>
        <li>Click on the Menu icon</li>
        <li>Select "Super"</li>
        <li>Select "Information"</li>
        <li>Select "Carry-forward concessional contributions"</li>
      </ul>

      <p>This page will show you how much combined cap you actually have.</p>
      <p>
        Once you exceed the cap for the current fin year (27500), excess cap
        space is taken from the furthest back year first.
      </p>

      <div>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.ato.gov.au/individuals/super/growing-and-keeping-track-of-your-super/caps-limits-and-tax-on-super-contributions/concessional-contributions-cap/#:~:text=You%20can%20carry%20forward%20unused,amounts%20are%20carried%20forward%20first."
        >
          ATO: Carry Forward Cap
        </Link>
      </div>
    </div>
  );
}
