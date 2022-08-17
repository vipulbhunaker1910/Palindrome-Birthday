const dateInput = document.querySelector("#date-input");
const checkBtn = document.querySelector("#check-btn");
const outPut = document.querySelector("#output");


function  IsreverseStringPalindrome(dateStr)
{
    var allChars = dateStr.split('');
    var reverseAllChars = allChars.reverse();
    var reversedString = reverseAllChars.join('');

    return  reversedString===dateStr;

}

function  dateToString(date)
{
    var dateArr = { day:'',month:'',year:''}
        dateArr.day= date.day<10 ? "0"+date.day :date.day.toString();
        dateArr.month= date.month<10 ? "0"+date.month :date.month.toString();
    dateArr.year=date.year.toString();
    return dateArr;
}

function allPosibilities(date)
{
    const dateArr = dateToString(date);
    const ddmmyyyy = dateArr.day+dateArr.month+dateArr.year;
    const mmddyyyy = dateArr.month+dateArr.day+dateArr.year;
    const yyyymmdd = dateArr.year+dateArr.month+dateArr.day;
    const ddmmyy = dateArr.day+dateArr.month+dateArr.year.slice(-2);
    const mmddyy = dateArr.month+dateArr.day+dateArr.year.slice(-2);
    const yymmdd = dateArr.year.slice(-2)+dateArr.month+dateArr.day;
    formatsArr =[ddmmyyyy , mmddyyyy,yyyymmdd,ddmmyy, mmddyy,yymmdd ];
    return formatsArr;
}

function  isPosibilitiesPalindrome (date)
{
    formatArr = allPosibilities(date);
    var sol=false;

     for(i=0;i<formatArr.length;i++)
     {
         sol=IsreverseStringPalindrome(formatArr[i]);
         if(sol)
         {
             return sol ;
             break;
         }
         
     }
     return sol;
}

function  leapYear(year)
{
    if(year%400===0){
        return true;
    }
    if(year%100===0){
        return false;
    }
    if(year%4===0){
        return true;
    }

    return false;
}

 function  getNextDate( date)
 {
     var day =date.day+1;
     var month =date.month;
     var year =date.year;
    var totalDaysArr=[31,28,31,30,31,30,31,31,30,31,30,31];
    if(month==2)
    {
        if(leapYear(year))
        {
            if(day>29)
            {
                day=1;
                month++
            }
        }
        else 
        {
            if(day>totalDaysArr[month-1])
            {
                day=1;
                month++;

            }
        }
    }
    else if(day>totalDaysArr[month-1])
    {
        day=1;
        month++;
    }

    if(month>12)
    {
        month=1;
        year++;
    }
    return {
        day:day, month:month,year:year
    };
 }
 function  getPreviousDate( date)
 {
     var day =date.day-1;
     var month =date.month;
     var year =date.year;
    var totalDaysArr=[31,28,31,30,31,30,31,31,30,31,30,31];
    if(month==2)
    {
        if(leapYear(year))
        {
            if(day>29)
            {
                day=01;
                month--;
            }
        }
        else 
        {
            if(day>totalDaysArr[month-1])
            {
                day=01;
                month--;

            }
        }
    }
    else if(day>totalDaysArr[month-1])
    {
        day=1;
        month--;
    }

    if(month>12)
    {
        month=1;
        year--;
    }
    return {
        day:day, month:month,year:year
    };
 }
function  getNextPalindromeOccurance(date){
    var count = 0;
    var nextDate = getNextDate(date);
    while(1){
      count++;
      var isPalindrome =isPosibilitiesPalindrome(nextDate); ;
      if(isPalindrome){
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    
    return [count, nextDate];
  }
function getpreviouspalindromeocc(date){
    var count2=0;
    var previousDate=getPreviousDate(date);
    while(1){
        count2++;
        var isPalindrome =isPosibilitiesPalindrome(previousDate); ;
        if(isPalindrome){
          break;
        }
        previousDate = getPreviousDate(previousDate);
      }
      return [count2, previousDate];
}
function  checkpalindrome(){
var bdaydate = dateInput.value;
  if(bdaydate!== '')
  {
    datearr = bdaydate.split('-');
    var date ={
     day : Number(datearr[2]),
     month: Number(datearr[1]),
     year: Number(datearr[0]),
    }
  }
  else 
  {
    outPut.innerText = "Please enter DOB"
  }
 var sol = isPosibilitiesPalindrome(date);
     if(sol)
      {
         outPut.innerText = "Yeyy!! your birthday is palindrome";
        }
    else{
         var [count,nextDate] = getNextPalindromeOccurance(date);
         var [count2,previousDate]=getpreviouspalindromeocc(date);
         if(count<count2){
         outPut.innerText= "The nearest palindrome is at"+ nextDate.day+"-"+
         nextDate.month+"-"+nextDate.year+",oh! u missed palindrome by "+count+" days!";
         }
         else{
            
            outPut.innerText= "The nearest palindrome was at"+ previousDate.day+"-"+
            previousDate.month+"-"+previousDate.year+",oh! u missed palindrome by "+count2+" days!";
         }
    
        } 


}

checkBtn.addEventListener('click',checkpalindrome);