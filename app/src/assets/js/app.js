const compose = (f, g) => {
    return (x) => {
        return f(g(x));
    };
};

const getRand = (v) => {
    return Math.floor(Math.random() * v)
};

const randHex = () => {
    return '#' + getRand(16777215).toString(16)
};

const getColor = (a) => {
    return a[getRand(a.length)];
};

const setPosX = (x) => {
    return $(x).each( (i,v) => {
        $(v).css('left', getRand(document.body.clientWidth));
    });
};

const setPosY = (x) => {
    return $(x).each( (i,v) => {
        $(v).css('top', getRand(document.body.clientHeight));
    });
};

const posRand = compose(setPosX, setPosY);

posRand('.randPos');


$('.button').on('click', function () {
    const folder = "../img/";
    $.ajax({
        url: folder,
        success: (data) => {
            $(data).find("a").attr("href", (i, val) => {
                if (val.match(/\.(jpe?g|png|gif)$/)) {
                    $("body").append("<img src='" + folder + val + "'>");
                }
            });
        }
    });
});

const colors = ['rgba(221, 68, 221, 0.533)', '#43FFEE', '#43FF85', '#FCFF43', '#43ACFF', '#9643FF', '#43FFAC', '#FFA743', '#C643FF', '#1300B6', '#B60000', '#B600A8', '#B6007F'];

$('h1').css('color', getColor(colors));
