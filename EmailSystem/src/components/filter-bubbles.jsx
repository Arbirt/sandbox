import PropTypes from "prop-types";
import "../styles/component-styles.css";
import { RiCloseLine } from "@remixicon/react";

const keyMapping = {
  template: "Template",
  user: "User",
  status: "Status",
  batchName: "Batch Title",
  fromStage: "From Stage",
  stage: "Stage",
  editDateFrom: "Edited from",
  editDateTo: "Edited to",
  createDateFrom: "Create from",
  createDateTo: "Create to",
};

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
              <span>{`${keyMapping[key]}: ${value}`}</span>
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
