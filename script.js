let video = document.getElementById("video");
let buttons = document.getElementById("buttons");
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let play_button = document.getElementById("play");
let audio = document.getElementById("audio");
let player = document.getElementById("player");
let logger = document.getElementById('logger');

//{type: "start/end", video_path: "videos/1.mp4", },

characters = [
    {name: "психиатр", ans_text_1: "Не спасать", ans_text_2: "Спасти", videos: [
        {type: "story", story_path: "videos/1.mp4"},
        {type: "lock",  lock_path: "videos/1.0.mp4"},
        {type: "answer", path_1: "videos/1.1.mp4", path_2: "videos/1.2.mp4"}
    ]},

    {name: "лётчик", ans_text_1: "Спасти себя", ans_text_2: "Спасти пассажиров", videos: [
        {type: "story", story_path: "videos/2.mp4"},
        {type: "lock",  lock_path: "videos/2.0.mp4"},
        {type: "answer", path_1: "videos/2.1.mp4", path_2: "videos/2.2.mp4"}
    ]},
];

// на старте

let cur_char_num = 0;
let cur_character = characters[cur_char_num];
let cur_type = 'story';
buttons.hidden = true;
button1.innerHTML = cur_character.ans_text_1;
button2.innerHTML = cur_character.ans_text_2;
video.src = cur_character.videos[0].story_path;

audio.volume = 0.08;


// video.play();

// video.removeAttribute("controls");
// video.removeAttribute("poster");

// video.addEventListener('click', () => { video.play(); })

play_button.addEventListener('click', () => {
    logger.innerHTML = "Клик ёпта";
    player.hidden = false;
    play_button.hidden = true;
    video.play();
    audio.play();
    document.body.requestFullscreen();
});

video.addEventListener('ended', () => {
    console.log("Stop video");
    console.log("Stopped type:" , cur_type);

    if (cur_character.name === "start") {
        cur_char_num += 1;
        cur_type = cur_character.videos[1].type;
        cur_character = characters[cur_char_num];
        cur_type = 'story';

        buttons.hidden = true;
        button1.innerHTML = cur_character.ans_text_1;
        button2.innerHTML = cur_character.ans_text_2;
    }

    else if (cur_type === "story") {

        cur_type = 'lock';
        video.setAttribute("loop", "loop");
        // video.setAttribute("muted", true);
        video.src = cur_character.videos[1].lock_path;
        cur_type = cur_character.videos[1].type;

        button1.innerHTML = cur_character.ans_text_1;
        button2.innerHTML = cur_character.ans_text_2;
        buttons.hidden = false;

        video.play();
    }

    else if (cur_type === "answer") {
        cur_type = 'story';
        cur_char_num += 1;
        cur_character = characters[cur_char_num];

        video.src = cur_character.videos[0].story_path;
        video.play();
    }
        });


button1.addEventListener('click', () => {
    cur_type = 'answer';
    video.removeAttribute("loop");
    // video.removeAttribute("muted");
    buttons.hidden = true;

    video.src = cur_character.videos[2].path_1;

    video.play();
    });

button2.addEventListener('click', () => {
    cur_type = 'answer';
    video.removeAttribute("loop");
    // video.removeAttribute("muted");
    buttons.hidden = true;

    video.src = cur_character.videos[2].path_2;

    video.play();
});
