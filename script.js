
// Set data to HTML Element
function setData(id, data){
    document.getElementById(id).innerHTML = data
}
// Get HTML Element Value
function getData(id){
    return document.getElementById(id).value
}

// Search User
function searchUser(event){
    event.preventDefault()
    const userName = getData('username')
    const url = `https://api.github.com/users/${userName}`
    fetch(url, {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then(response => response.json())  // convert to json
        .then(data => {       
            console.log(data)
            if(data.id){
                const userData = 
                `<div class="user-data">
                    <div id="user_image">
                        <img src="${data.avatar_url}" alt="">
                    </div>
                    <div class="full-name">
                        ${data.name}
                    </div>
                    <p class="join-date">Joined at ${ new Date(data.created_at).getFullYear()}</p>
                    <div class="flowers">
                        <p> <span>${data.followers}</span> Followers</p>
                        <p> <span>${data.following}</span> Following</p>
                        <p> <span>${data.public_repos}</span> Repos</p>
                    </div>
                    <div id="display_repos">
                        
                    </div>
                </div>`
            document.getElementById('display_result').style.display = 'flex'
            document.getElementById('form').style.display = 'none'
            setData("display_result", userData)

            getRepos(userName)
            }else{
                setData('msg', data.message)
            }

        }) //print data to console
        .catch(err => console.log('Request Failed', err)); // Catch errors
}
    


// User repository list
function getRepos(userName){
    const url = `https://api.github.com/users/${userName}/repos`
    fetch(url, {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then(response => response.json())  // convert to json
        .then(data => {       

            let userRepos = ""

                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    userRepos = userRepos + `<a class="repo-link" target="_blank" href="${data[i].html_url}">${data[i].name}</a>`
                }
                setData("display_repos", userRepos)
        }) //print data to console
        .catch(err => console.log('Request Failed', err)); // Catch errors
}
