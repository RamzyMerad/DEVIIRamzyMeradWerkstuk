firebase.initializeApp({
    apiKey: 'AIzaSyChHydxQl3kKcSh5hlEfye--oqw4GOwKF4',
    projectId: 'fir-tft-builds'
});

const database = firebase.firestore();
const buildsCollection = database.collection("savebuilds");

const convertQuerySnapshotToRegularArray = (querySnapshot) => querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data()
}));

const sortByTimeStamp = (a, b) => {
    if (a.timestamp < b.timestamp) {
        return 1;
    }
    if (a.timestamp > b.timestamp) {
        return -1;
    }
};
let databaseBuild = [];

async function renderBuilds() {

    buildsCollection.onSnapshot((querySnapshot) => {
        let htmlString = '';
        const builds = convertQuerySnapshotToRegularArray(querySnapshot);
        builds.sort(sortByTimeStamp);
        builds.forEach((build) => {
            databaseBuild.push(build);
            console.log(build);
            htmlString = `
            <h3 class="build" id="${build.id}">${build.name}</h3>
          `;
            document.getElementById('savebuilds').innerHTML += htmlString;
            let buildsOP = document.querySelectorAll(".build")
            console.log("quelque chose");
            buildsOP.forEach(element => {
                element.addEventListener("click", function () {
                    vieuwBuild(element.id);
                })

            })
        });


    });
}

renderBuilds();

let build = {
    name: "",
    championsarray: []
};
let buildname;
let savebutton = document.getElementById("savebutton");
savebutton.addEventListener("click", function () {
    console.log("click");
    buildname = document.getElementById("buildname");
    buildname.value = build.name;
    addBuild(build);
    document.getElementById('savebuilds').innerHTML = "";
})



function vieuwBuild(element) {
    let found = databaseBuild.find(build => build.id == element);
    let updatebutton = document.getElementById("updatebutton");
    build = found;
    console.log(build);
    case1.style.backgroundImage = `url("../assets/dragon/champions/${found.championsarray[0]}.png")`;
    case1.dataset.champion = found.championsarray[0];
    case2.style.backgroundImage = `url("../assets/dragon/champions/${found.championsarray[1]}.png")`;
    case2.dataset.champion = found.championsarray[1];
    case3.style.backgroundImage = `url("../assets/dragon/champions/${found.championsarray[2]}.png")`;
    case3.dataset.champion = found.championsarray[2];
    case4.style.backgroundImage = `url("../assets/dragon/champions/${found.championsarray[3]}.png")`;
    case4.dataset.champion = found.championsarray[3];
    case5.style.backgroundImage = `url("../assets/dragon/champions/${found.championsarray[4]}.png")`;
    case5.dataset.champion = found.championsarray[4];
    case6.style.backgroundImage = `url("../assets/dragon/champions/${found.championsarray[5]}.png")`;
    case6.dataset.champion = found.championsarray[5];
    case7.style.backgroundImage = `url("../assets/dragon/champions/${found.championsarray[6]}.png")`;
    case7.dataset.champion = found.championsarray[6];
    case8.style.backgroundImage = `url("../assets/dragon/champions/${found.championsarray[7]}.png")`;
    case8.dataset.champion = found.championsarray[7];
    case9.style.backgroundImage = `url("../assets/dragon/champions/${found.championsarray[8]}.png")`;
    case9.dataset.champion = found.championsarray[8];
    case10.style.backgroundImage = `url("../assets/dragon/champions/${found.championsarray[9]}.png")`;
    case10.dataset.champion = found.championsarray[9];
    buildname.value = found.name;
    updatebutton.dataset.champion = found.id;

}

updatebutton.addEventListener("click", function () {

})






function addBuild(build) {
    console.log(build);
    buildsCollection.add(build).then(ref => {
        console.log(ref.id);
    })

}
// $(".savebutton").click(function () {
//     let buildname = $("input.buildname").val();
//     console.log(buildname);
//     championsarray = [];

// });


let case1 = document.querySelector('#div1');
let case2 = document.querySelector('#div2');
let case3 = document.querySelector('#div3');
let case4 = document.querySelector('#div4');
let case5 = document.querySelector('#div5');
let case6 = document.querySelector('#div6');
let case7 = document.querySelector('#div7');
let case8 = document.querySelector('#div8');
let case9 = document.querySelector('#div9');
let case10 = document.querySelector('#div10');
let cases = document.querySelectorAll('.buildcases div');


let hero = document.querySelectorAll('.imgchampions img');
console.log(hero);
hero.forEach(element => {
    element.addEventListener('click', () => {

        if (checked(build.championsarray)) {
            build.championsarray.push(element.id);

        }
        console.log(build.championsarray);
        if (case1.style.backgroundImage == "") {
            case1.style.backgroundImage = `url("../assets/dragon/champions/${element.id}.png")`
            case1.dataset.champion = element.id;
        } else if (case2.style.backgroundImage == "") {
            case2.style.backgroundImage = `url("../assets/dragon/champions/${element.id}.png")`
            case2.dataset.champion = element.id;
        } else if (case3.style.backgroundImage == "") {
            case3.style.backgroundImage = `url("../assets/dragon/champions/${element.id}.png")`
            case3.dataset.champion = element.id;
        } else if (case4.style.backgroundImage == "") {
            case4.style.backgroundImage = `url("../assets/dragon/champions/${element.id}.png")`
            case4.dataset.champion = element.id;
        } else if (case5.style.backgroundImage == "") {
            case5.style.backgroundImage = `url("../assets/dragon/champions/${element.id}.png")`
            case5.dataset.champion = element.id;
        } else if (case6.style.backgroundImage == "") {
            case6.style.backgroundImage = `url("../assets/dragon/champions/${element.id}.png")`
            case6.dataset.champion = element.id;
        } else if (case7.style.backgroundImage == "") {
            case7.style.backgroundImage = `url("../assets/dragon/champions/${element.id}.png")`
            case7.dataset.champion = element.id;
        } else if (case8.style.backgroundImage == "") {
            case8.style.backgroundImage = `url("../assets/dragon/champions/${element.id}.png")`
            case8.dataset.champion = element.id;
        } else if (case9.style.backgroundImage == "") {
            case9.style.backgroundImage = `url("../assets/dragon/champions/${element.id}.png")`
            case9.dataset.champion = element.id;
        } else if (case10.style.backgroundImage == "") {
            case10.style.backgroundImage = `url("../assets/dragon/champions/${element.id}.png")`
            case10.dataset.champion = element.id;
        }
        console.log(element.id);
    })
});

function checked(champions) {
    if (champions.length <= 9) {
        return true
    } else {
        return false
    };
}

// $(".championsbox img").click(function () {
//     console.log(build.championsarray.length);
//     let lengtearray = build.championsarray.length;
//     if (lengtearray >= 9) {
//         // build.championsarray.splice(build.championsarray.length);
//         console.log(build.championsarray);
//     } else {
//         let idChamp = $(this).attr("id");
//         $("div#div" + 10).css('background-image', '../assets/dragon/champions/' + idChamp + '.png');
//         case1.style.backgroundSize = "cover";
//         build.championsarray.push(idChamp);
//     }


// });


cases.forEach(element => {
    element.addEventListener('click', () => {
        // build.championsarray = build.championsarray.filter(item => item !== element.class);
        // console.log($(this).attr("class"));
        removeChamp(element);
    })

})

function removeChamp(element) {
    for (let i = 0; i < build.championsarray.length; i++) {
        if (build.championsarray[i] == element.dataset.champion) {
            build.championsarray.splice(i, 1);
            element.style.background = "";
            element.dataset.champion = "";
            console.log(build.championsarray);
        }

    }
}