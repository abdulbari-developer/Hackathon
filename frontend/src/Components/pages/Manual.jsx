import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { manualBill } from "../../features/manual/manualAction";
import { Link } from "react-router-dom";

function Manual() {
  const [units, setUnits] = useState(0);
  const [tariff, setTariff] = useState(10);
  const [extra, setExtra] = useState(0);

  const dispatch = useDispatch();

  const { manual, loading, error } = useSelector(
    (state) => state.manualBill
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const baseCost = units * tariff;
    const tax = baseCost * 0.05;
    const total = baseCost + tax + Number(extra);

    dispatch(
      manualBill({
        units,
        baseCost,
        tax,
        extra,
        total,
      })
    );
  };

  return (
    <div className="manual-sec section">
      <Link className="link" to='/'>&lt;&nbsp;Back to Home</Link>
      <h1 className="manual-h head-1">Manual Bill Input</h1>

      <form className="form-manual form" onSubmit={handleSubmit}>
        <label htmlFor="units">Units Consumed:</label>
        <input
          type="number"
          placeholder="Units Consumed"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          className="manual-input units"
        />
        <label htmlFor="tariff">Tariff Rate (PKR/unit):</label>
        <input
          type="number"
          placeholder="Tariff Rate (PKR/unit)"
          value={tariff}
          onChange={(e) => setTariff(e.target.value)}
          className="manual-input tariff"
        />
        <label htmlFor="extra">Extra Charges:</label>
        <input
          type="number"
          placeholder="Extra Charges"
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          className="manual-input extra-charge"
        />

        <button className="explain-btn" disabled={loading}>
          {loading ? "Explaining..." : "Explain My Bill"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {manual && (
        <div className="result-div">
          {manual}
        </div>
      )}
    </div>
  );
}

export default Manual;
