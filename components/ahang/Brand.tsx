import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" aria-label="AhangBazar">
      <div className="brand" aria-label="AhangBazar">
        <span className="brand-mark">
          <i />
          <i />
          <i />
        </span>
        <b>
          AHANG
          <br />
          BAZAR
        </b>
      </div>
    </Link>
  );
}
