import { Select, Tooltip, Space, ConfigProvider } from "antd";
import PropTypes from "prop-types";
const { Option } = Select;

const Selectdropdown = ({
  options,
  placeholder,
  onChange,
  mode,
  style,
  width,
  value,
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            colorPrimary: "orangered",
            colorTextBase: "orangered",
            colorBgContainer: "white",
            controlItemBgActive: "rgba(255, 69, 0, 0.2)",
            colorLinkActive: "orangered",
            colorLinkHover: "orangered",
            colorLink: "orangered",
          },
        },
      }}
    >
      <Select
        defaultValue={value}  
        maxTagCount="responsive"      
        value={value}
        showSearch
        mode={mode}
        style={{
          width: width ? width : "100%",
          ...style,
        }}
        placeholder={placeholder}
        onChange={onChange}
      >
        {options.map((option) => (
          <Option
            className="option-item"
            key={option.value}
            value={option.value}
            label={option.value}
            style={{ color: "orangered", padding: "10px" }}
          >
            {option.label}
          </Option>
        ))}
      </Select>
    </ConfigProvider>
  );
};

Selectdropdown.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  mode: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.string,
  width: PropTypes.string,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
};

export default Selectdropdown;
