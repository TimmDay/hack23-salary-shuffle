import { getYAxis } from "@/utilities/utilities";
import Link from "next/link";
import { DollarInput } from "../DollarInput/DollarInput";
import { InfoTippy } from "../Tippy/InfoTippy";
import styles from "./InputBlock.module.css";

type Props = {
  setIncome: any;
  income: any;
  setSalSac: any;
  salsac: any;
  setYAxis: any;
};

export function InputBlock({
  setIncome,
  setSalSac,
  setYAxis,
  income,
  salsac,
}: Props) {
  return (
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
            onChange={(event: any) => setSalSac(parseInt(event.target.value))}
          />
          <span className={styles.perMonth}>/ mo </span>
        </div>
      </div>
    </div>
  );
}

function Tippy() {
  return (
    <InfoTippy iconId="alert-circle" placement="bottom">
      <div className={styles.tipContent}>
        <div>{`Assumptions:`}</div>
        <div>{`Annual Salary includes super`}</div>
        <div>{`You are not paying the medicare levy surcharge`}</div>

        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.ato.gov.au/Individuals/Medicare-and-private-health-insurance/Medicare-levy-surcharge/Paying-the-medicare-levy-surcharge/"
        >
          ATO: Medicare Levy Surcharge
        </Link>
      </div>
    </InfoTippy>
  );
}
