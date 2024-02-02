import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  var [rollno, setrollno] = useState('');
  var [name, setname] = useState('');
  var [sub1, setsub1] = useState('');
  var [sub2, setsub2] = useState('');
  var [sub3, setsub3] = useState('');
  var [sub4, setsub4] = useState('');
  var [sub5, setsub5] = useState('');
  var [pass, setpass] = useState('');
  var [resultdata, setresultdata] = useState([]);
  var [reset , setreset ] =useState ([]);

  var handelclick = () => {
    var totalmark = parseFloat(sub1) + parseFloat(sub2) + parseFloat(sub3) + parseFloat(sub4) + parseFloat(sub5)
    var per=0;
    if (sub1 >= 35 && sub2 >= 35 && sub3 >= 35 && sub4 >= 35 && sub5 >= 35) {
      per = (totalmark / 500) * 100;
    } else {
      per=0;
    }

    var min = 0;
    var minval = Math.min(sub1, sub2, sub3, sub4, sub5);

    var max = 0;
    var maxval = Math.max(sub1, sub2, sub3, sub4, sub5);
    
    var result = '';
    var cnt = [sub1, sub2, sub3, sub4, sub5].filter((submarks) => submarks < 35).length;
    if (cnt == 0) {
      result = "PASS";
    } else if (cnt == 1 || cnt == 2) {
      result = "ATKT";
    } else {
      result = "FAIL";
    }
    setpass(result);

    var newstddata = {

      rollno: rollno,
      name: name,
      subject1: sub1,
      subject2: sub2,
      subject3: sub3,
      subject4: sub4,
      subject5: sub5,
      Total: totalmark,
      Percentage: per,
      Minimum: minval,
      Maximum: maxval,
      Result: result,
    };
    setresultdata( [...resultdata, newstddata]);
    setreset([...reset, newstddata]);

    setrollno('');
    setname('');
    setsub1('');
    setsub2('');
    setsub3('');
    setsub4('');
    setsub5('');

  };

  var selector = (e) => {
    var demo = reset.filter((data) =>{
      return data.Percentage >= parseFloat(e.target.value);
    });
    setresultdata(demo);
  }

  var selectres = (e) => {
    var demo1 = reset.filter((data) => {
      return data.Result ===(e.target.value)
    });
    setresultdata(demo1);
  }

  var btnall = () => {
    setresultdata([...reset]);
  }

  var btnshort = () => {
    const demo2 = ([...reset]);
    demo2.sort((a,b) => b.Percentage - a.Percentage);
    setresultdata(demo2);
  }

  return (
    <div className="App">
      <div className='result'>
        <div>
          Roll No : <input type='text' value={rollno} onChange={(e) => setrollno(e.target.value)}></input>
        </div>
        <div>
          Name : <input type='text' value={name} onChange={(e) => setname(e.target.value)}></input>
        </div>
        <div>
          subject1 : <input type='text' value={sub1} onChange={(e) => setsub1(e.target.value)}></input>
        </div>
        <div>
          subject2 : <input type='text' value={sub2} onChange={(e) => setsub2(e.target.value)}></input>
        </div>
        <div>
          subject3 : <input type='text' value={sub3} onChange={(e) => setsub3(e.target.value)}></input>
        </div>
        <div>
          subject4 : <input type='text' value={sub4} onChange={(e) => setsub4(e.target.value)}></input>
        </div>
        <div>
          subject5 : <input type='text' value={sub5} onChange={(e) => setsub5(e.target.value)}></input>
        </div>
        <input type='button' value="result" onClick={handelclick}></input>
        <br></br>
        <select onChange={selector}>
          <option disabled> Percentage</option>
          <option value={"90+"}>90+ Percentage</option>
          <option value={"80+"}>80+ Percentage</option>
          <option value={"70+"}>70+ Percentage</option>
          <option value={"60+"}>60+ Percentage</option>
          <option value={"50+"}>50+ Percentage</option>
          <option value={"40+"}>40+ Percentage</option>
        </select>
        <select onChange={selectres}>
          <option disabled> Result</option>
          <option value={"PASS"}>PASS</option>
          <option value={"FAIL"}>FAIL</option>
          <option value={"ATKT"}>ATKT</option>
        </select>

        <input type='button' value={"ALL"} onClick={btnall}></input>
        <input type='button' value={"SORTALL"} onClick={btnshort}></input>

      </div>

      <br></br>
      <br></br>

      <table border={1} className='tbl'>
        <thead>
          <tr>
            <td>Roll No</td>
            <td>Name</td>
            <td>subject1</td>
            <td>subject2</td>
            <td>subject3</td>
            <td>subject4</td>
            <td>subject5</td>
            <td>Total</td>
            <td>Percentage</td>
            <td>Minimum</td>
            <td>Maximum</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          {resultdata.map((data, index) => (
            <tr key={index} style={{ backgroundColor: data.Result === "PASS" ? "green" : data.Result === "ATKT" ? "blue" : "red" }}>
              <td>{data.rollno}</td>
              <td>{data.name}</td>
              <td>{data.subject1}</td>
              <td>{data.subject2}</td>
              <td>{data.subject3}</td>
              <td>{data.subject4}</td>
              <td>{data.subject5}</td>
              <td>{data.Total}</td>
              <td>{data.Percentage}</td>
              <td>{data.Minimum}</td>
              <td>{data.Maximum}</td>
              <td>{data.Result}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );  
}

export default App;


