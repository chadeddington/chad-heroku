import React from 'react';

function Searchbar({search}) {
  const thisYear = new Date().getFullYear();
  const [month, setMonth] = React.useState(new Date().getMonth() + 1);
  const [year, setYear] = React.useState(thisYear);

  const handleMonth = (e) => {
    setMonth(e.target.value);
  }

  const handleYear = (e) => {
    // TODO: Validate Year
    setYear(e.target.value)
  }

  const handleClick = (e) => {
    search({month, year})
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const inputStyles = {
    height: 35,
    padding: 0,
    boxSizing: "content-box",
    margin: 5,
    borderRadius: 4,
    fontSize: 18,
    textAlign: 'center'
  }
  return (
    <div>
      <select onChange={handleMonth} style={{...inputStyles}} value={month}>
        {months.map( (month, i) => <option value={i + 1}>{month}</option>)}
      </select>

      <input type="text" placeholder={new Date().getFullYear()} onChange={handleYear} style={{...inputStyles, width: 100}}/>

      <button onClick={handleClick} style={{...inputStyles, padding: "0 10"}}>Get Photos</button>
    </div>
  )
}

export default Searchbar;