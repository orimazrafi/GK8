const Query = ({ value, handleChange, placeholder }) => {
  return (
    <label>
      Ethereum address
      <input value={value} onChange={handleChange} placeholder={placeholder} />
    </label>
  );
};
export default Query;
