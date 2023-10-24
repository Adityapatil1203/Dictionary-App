const form = document.querySelector('form');

const resultDiv = document.querySelector('.result');

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  getWordInfo(form.elements[0].value);
});

 const getWordInfo = async (word)=>{
    try {
        
     
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    const data = await response.json();

    let definitions = data[0].meanings[0].definitions[0];

    resultDiv.innerHTML = `<h2> Word: ${data[0].word} </h2>

     <p>  ${data[0].meanings[0].partOfSpeech}</p>

     <p>  <strong>Meaning :</strong>${data[0].meanings[0].definitions[0].definition}</p>

    <p> <strong>Example :</strong>${definitions.example == undefined ? "Not found" : definitions.example}</p>
    
    <p> <strong> Antonyms: </strong> </p>
    
    `;

    if(definitions.antonyms.length == 0)
    {
        resultDiv.innerHTML+=`<span> Not found </span>`
    }else{
    for(let i=0;i<definitions.antonyms.length;i++)
    {
        resultDiv.innerHTML+=`<li> ${definitions.antonyms[i]}</li>`
    }
  }

// resultDiv.innerHTML += `<br>`
  //Adding Read more Button
   resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank" > Read More </a> </div>`
    console.log(data);
} catch (error) {
    resultDiv.innerHTML = `<p> Sorry,Word not found </p>`
}
}




