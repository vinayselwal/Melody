const music = new Audio('vande.mp3');

// create Array 

const songs = [
    {
        id:"1",
        songName: `Dil Da Dimaag`,
        songArtist:`<div class="subtitle">Sharrry Maan</div>`,
        poster: "img/1.jpg",
    },
    {
        id:"2",
        songName: `College`,
        songArtist:`<div class="subtitle">Mankirt Aulakh</div>`,
        poster: "img/2.jpg",
    },
    {
        id:"3",
        songName: `Agar Tum Sath Ho`,
        songArtist:`<div class="subtitle">Tamashaa</div>`,
        poster: "img/3.jpg",
    },
    {
        id:"4",
        songName: `Suna Hai`,
        songArtist:`<div class="subtitle">Neha Kakker</div>`,
        poster: "img/4.jpg",
    },
    {
        id:"5",
        songName: `Duniya`,
        songArtist:`<div class="subtitle">Luka Chuppi</div>`,
        poster: "img/5.jpg",
    },
    {
        id:"6",
        songName: `Lagdi Lahore Di`,
        songArtist:`<div class="subtitle">Street Dancer 3D</div>`,
        poster: "img/6.jpg",
    },
    {
        id:"7",
        songName: `Baarishein`,
        songArtist:`<div class="subtitle">Atif Aslam</div>`,
        poster: "img/7.jpg",
    },
    {
        id:"8",
        songName: `Vaaste`,
        songArtist:`<div class="subtitle">Dhvani Bhanushali</div>`,
        poster: "img/8.jpg",
    },
    {
        id:"9",
        songName: `Blank space`,
        songArtist:`<div class="subtitle">Taylor Swift</div>`,
        poster: "img/9.jpg",
    },
    {
        id:"10",
        songName: `Faded`,
        songArtist:`<div class="subtitle">Alan Walker</div>`, 
        poster: "img/10.jpg",
    },
    {
        id:"11",
        songName: `Perfect`,
        songArtist:`<div class="subtitle">Ed Sheeran</div>`,
        poster: "img/11.jpg",
    },
    {
        id:"12",
        songName: `Stay`,
        songArtist:`<div class="subtitle">Justin Bieber</div>`,
        poster: "img/12.jpg",
    },
]


Array.from(document.getElementsByClassName('songItem')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;

})


let masterPlay = document.getElementById('masterPlay');
let poster_master_play = document.getElementById('poster_master_play');
masterPlay.addEventListener('click',()=>{
    if (music.paused || music.currentTime <=0) {
        music.play();
        poster_master_play.classList.add('rotate');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
       
    } else {
        music.pause();
        poster_master_play.classList.remove('rotate');
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
    }
} )


const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
            poster_master_play.classList.add('rotate');
    })
}
const makeAllBackgrounds = () =>{
    Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
            element.style.background = "rgb(105, 105, 170, 0)";
    })
}

let index = 0;
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        poster_master_play.classList.add('rotate');
        music.src = `audio/${index}.mp3`;
        poster_master_play.src =`img/${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })

        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        song_title.forEach(ele =>{
            let {songArtist} = ele;
            subtitle.innerHTML = songArtist;
        })
        poster_master_play.classList.add('rotate');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        music.addEventListener('ended',()=>{
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            poster_master_play.classList.remove('rotate');
            wave.classList.remove('active2');
        })
    })
})


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10) {
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if (sec1<10) {
        sec1 = `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended', ()=>{
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
})


let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})



let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src =`img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    song_title.forEach(ele =>{
        let {songArtist} = ele;
        subtitle.innerHTML = songArtist;
    })
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('bi-play-circle-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-circle-fill');
    document.getElementById(`${index}`).classList.add('rotate');
    
    
})
next.addEventListener('click', ()=>{
    index -= 0;
    index += 1;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
        }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src =`img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    song_title.forEach(ele =>{
        let {songArtist} = ele;
        subtitle.innerHTML = songArtist;
    })
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('bi-play-circle-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-circle-fill');
    document.getElementById(`${index}`).classList.add('rotate');
    
})


let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft -= 330;
})
right_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft += 330;
})


let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click', ()=>{
    item.scrollLeft -= 330;
})
right_scrolls.addEventListener('click', ()=>{
    item.scrollLeft += 330;
})

const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector("#icon");

// if user press any key and release
inputBox.onkeyup= (e)=>{
    let userData = e.target.value; //user enetered data
    if(userData !==""){

        var index = suggestions.indexOf(userData);
        let emptyArray = [];
        
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }
    else{
        showSuggestions([]);
    }

}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.addEventListener('click', ()=>{
        index =suggestions.indexOf(selectData);
        index++;
        music.src = `audio/${index}.mp3`;
        poster_master_play.src =`img/${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })
    
        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        song_title.forEach(ele =>{
            let {songArtist} = ele;
            subtitle.innerHTML = songArtist;
        })
        makeAllPlays()
        document.getElementById(`${index}`).classList.remove('bi-play-fill');
        document.getElementById(`${index}`).classList.add('bi-pause-fill');
        document.getElementById(`${index}`).classList.add('rotate');
    })
    searchWrapper.classList.remove("active");
}

window.addEventListener('load', function(){
    var loader = document.getElementById('preloader');
    loader.style.display = 'none';
  });

function showSuggestions(list){
    let listData;
    if(!list.length && inputBox.value!=""){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    } 
    suggBox.innerHTML = listData;
}