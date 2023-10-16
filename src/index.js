console.log(data);

// WRITE YOUR CODE BELOW!


// ## Instructions Part 1
// - Use the provided `index.js` as a starting point.
// - You'll find a variable called `data` in the console.log. That's your **list of dogs**
// - Render the top list of dogs using the list item template you'll find on the HTML file
// - Each list item **should be clickable**. When you click on an item, the selected dog should display on the main card
// - The main card should contain all the information from the selected dog. **Follow the template for the main card that you'll find on the HTML file.**
// - There should be only **one card at the time** on the screen



console.log(data);

// WRITE YOUR CODE BELOW!
// render top list of dogs (nav bar)


document.addEventListener('DOMContentLoaded', function () {

    const navBarList = document.querySelector('.dogs-list');
    const mainDogSection = document.querySelector('.main__dog-section');
    const main = document.querySelector('main')






    function renderDogList() {

        navBarList.innerHTML=''
        const addButton = document.createElement('li')
        addButton.innerText = '+'
        addButton.setAttribute('class', 'dogs-list__button dogs-list__button--add')
        navBarList.append(addButton)

        addButton.addEventListener('click', () => {
            const form = createDogForm()
            main.innerHTML=''
            main.append(form)
        })

        for (let i = 0; i < data.length; i++) {
            const li = document.createElement('li');
            li.setAttribute('class', 'dogs-list__button');
            li.innerText = data[i].name;
            navBarList.appendChild(li);
        }
    }

    function dogCard(dogData) {
        const sections = document.createElement('section')
        sections.classList.add('main__dog-section')

        const card = document.createElement('div');
        card.setAttribute('class', 'dog-card');

        const image = document.createElement('img');
        image.src = dogData.image;
        image.alt = dogData.name;
        card.appendChild(image);

        const name = document.createElement('h3');
        name.textContent = dogData.name;
        card.appendChild(name);

        const bio = document.createElement('p');
        bio.textContent = dogData.bio;
        card.appendChild(bio);

        const goodDogContainer = document.createElement('p');
        const goodDogLabel = document.createElement('em');
        goodDogLabel.innerText = 'Is Naughty?';
        goodDogContainer.appendChild(goodDogLabel);

        const goodDogStatus = document.createTextNode(dogData.isGoodDog? 'Yes' : 'No');
        goodDogContainer.append(goodDogStatus);
        card.appendChild(goodDogContainer);

        const goodDogToggle = document.createElement('button')
        const buttonText = dogData.isGoodDog ? 'Bad Dog!' : 'Good Dog!'
        goodDogToggle.innerText = buttonText
        card.appendChild(goodDogToggle)

        sections.append(card)

        return sections;
    }

    function displayDogCard(dogData) {
        const card = dogCard(dogData);

        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
        main.appendChild(card);
    }

    function handleDogNameClick(event) {
        if (event.target.classList.contains('dogs-list__button')) {
            const dogName = event.target.innerText;
            const selectedDog = data.find(dog => dog.name === dogName);
            if (selectedDog) {
                displayDogCard(selectedDog);
            }
        }
    }

    function createDogForm () {

        const sections = document.createElement('section')
        sections.classList.add('main__dog-section')

        const title = document.createElement('h2')
        title.innerText = 'Add a new dog'
        sections.append(title)

        const form = document.createElement('form')
        form.classList.add('form')

        const labelName = document.createElement('label')
        labelName.setAttribute('for', 'name')
        labelName.inneertext = 'dogs name'

        const inputName = document.createElement('input')
        inputName.setAttribute('type', 'text')
        inputName.setAttribute('id', 'name')
        inputName.setAttribute('name','name')

        const labelPicture = document.createElement('input')
        labelPicture.setAttribute('for', 'image')
        labelPicture.innerText = 'Dogs picture'

        const inputPicture = document.createElement('input')
        inputPicture.setAttribute('type', 'url')
        inputPicture.setAttribute('id', 'image')
        inputPicture.setAttribute('name', 'image')

        const labelBio = document.createElement('input')
        labelBio.setAttribute('for', 'bio')
        labelBio.innerText = 'Dogs bio'

        const inputBio = document.createElement ('textarea')
        inputBio.setAttribute('rows', '5')
        inputBio.setAttribute('id', 'bio')
        inputBio.setAttribute('name', 'bio')

        const inputSubmit = document.createElement('input')
        inputSubmit.setAttribute('type', 'submit')
        inputSubmit.setAttribute('id', 'submit')
        inputSubmit.setAttribute('name', 'submit')
        inputSubmit.setAttribute('value', "Add Dog")
        inputSubmit.classList.add('form__button')

        form.append(labelName, inputName, labelPicture, inputPicture, labelBio, inputBio, inputSubmit)

        form.addEventListener('submit', (event) => {
            event.preventDefault()
    
            const nameInput = document.querySelector('input[name="name"]')
            const urlInput = document.querySelector('input[name="image"]')
            const bioInput = document.querySelector('textarea')
    
            const newDog = {
                id: data.length + 1,
                name: nameInput.value,
                bio: bioInput.value,
                isGoodDog: true,
                image: urlInput.value
            }

            data.unshift(newDog)
            state.isAddingDog = false
            state.selectedDog = null
            render()
        })
    
        sections.append(form)
    
        return sections


    }

    navBarList.addEventListener('click', handleDogNameClick);

    renderDogList();

});




