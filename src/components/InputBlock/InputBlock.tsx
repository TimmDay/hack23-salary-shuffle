import { getYAxis } from "@/utilities/utilities";
import Link from "next/link";
import { ConcessionalCap } from "../ConcessionalCap/ConcessionalCap";
import { DollarInput } from "../DollarInput/DollarInput";
import { InfoTippy } from "../Tippy/InfoTippy";
import styles from "./InputBlock.module.css";

type Props = {
  setIncome: any;
  income: number;
  setSalSac: any;
  salsac: number;
  setYAxis: any;
  superNetSG: number;
};

export function InputBlock({
  setIncome,
  setSalSac,
  setYAxis,
  income,
  salsac,
  superNetSG,
}: Props) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.inputBlock}>
          <div className={styles.tippy}>
            <Tippy />
          </div>
          <div>
            <div className={styles.annotation}>Annual Salary</div>
            <DollarInput
              label={"annual salary"}
              width={0}
              size={"large"}
              placeholder={"annual salary"}
              title={"annual salary"}
              value={income}
              onChange={(event: any) => {
                setIncome(parseInt(event.target.value));
                setYAxis(() => getYAxis(parseInt(event.target.value)));
              }}
            />
          </div>

          <div>
            <div className={styles.annotation}>Monthly Salary Sacrifice</div>
            <div className={styles.salsac}>
              <DollarInput
                label={"salary sacrifice"}
                width={0}
                size={"large"}
                placeholder={"monthly salary sacrifice"}
                title="salsac"
                value={salsac}
                onChange={(event: any) =>
                  setSalSac(parseInt(event.target.value))
                }
              />
            </div>
            <div className={styles.annotationBase}>
              <ConcessionalCap sg={superNetSG} salSacPerMonth={salsac} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Tippy() {
  return (
    <InfoTippy iconId="alert-circle" placement="bottom">
      <div className={styles.tipContent}>
        <div>{`Assumptions:`}</div>
        <div>{`Your salary includes compulsory super (SG)`}</div>
        <div>{`You are not paying the medicare levy surcharge`}</div>

        <div>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.ato.gov.au/Individuals/Medicare-and-private-health-insurance/Medicare-levy-surcharge/Paying-the-medicare-levy-surcharge/"
          >
            ATO: Medicare Levy Surcharge
          </Link>
        </div>

        <div>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.ato.gov.au/individuals/super/growing-and-keeping-track-of-your-super/how-to-save-more-in-your-super/salary-sacrificing-super/#:~:text=Salary%20sacrifice%20super%20contributions%20are,salary%20sacrifice%20arrangement%20in%20place."
          >
            ATO: Salary Sacrificing Super
          </Link>
        </div>

        <div>SG means 'Super Guarantee'.</div>
        <div>It is the amount that your employer MUST</div>
        <div>(by law)pay into your super.</div>

        <div>It will go up to 11.5% next year</div>
        <div>For fin year 2023/34 that SG rate is 11%.</div>
        <div>and 12% the year after that.</div>

        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.ato.gov.au/individuals/super/growing-and-keeping-track-of-your-super/caps-limits-and-tax-on-super-contributions/concessional-contributions-cap/#:~:text=From%201%20July%202021%2C%20the,ordinary%20time%20earnings%20(AWOTE)."
        >
          ATO SG Super Guarantee
        </Link>
      </div>
    </InfoTippy>
  );
}
