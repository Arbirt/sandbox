import PropTypes from "prop-types";
import "../styles/component-styles.css";
import { RiCloseLine } from "@remixicon/react";

const FilterBubbles = ({ filters, onRemoveFilter }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "8px",
        marginTop: "10px",
      }}
    >
      {Object.entries(filters).map(([key, value]) => {
        if (value) {
          return (
            <div key={key} className="filter-bubble">
              <span>{`${key}: ${value}`}</span>
              <button onClick={() => onRemoveFilter(key)}>
                <RiCloseLine />
              </button>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
FilterBubbles.propTypes = {
  filters: PropTypes.object.isRequired,
  onRemoveFilter: PropTypes.func.isRequired,
};

export default FilterBubbles;
