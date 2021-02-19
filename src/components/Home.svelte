<style>
    .wrapper {
        display: flex;
        align-items:flex-start;
    }
    .title {
        display: flex;
        flex-direction: column;
        text-align: right;
        margin-top: -8px;
        align-items: flex-end;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        margin: 18px 0;
    }

    .info {
        text-align: left;
        padding-left: 24px;
        
    }

    h1 {
        font-size: 120px;
        line-height: 110px;
        letter-spacing: -8px;
    }

    h2 {
        line-height: 30px;
    }

    @media (max-width: 1024px) {
        .info {
            text-align: right;
        }

        .wrapper {
            flex-direction: column;
            align-items: normal;
        }
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 58px;
            line-height: 52px;
            letter-spacing: -4px;
        }

        .buttons {
            flex-direction: column;
            margin: 18px 0 0 0;
        }

        button {
            margin: 0 0 18px 0;
        }
    }

</style>

<div class="wrapper">
    <div class="title">
        <h1>LUBOS TOMANDL</h1>
        <h2>SENIOR BUSINESS ANALYST/</h2>
        <h2>JUNIOR FULL-STACK DEVELOPER</h2>
        <div class="buttons">
            <a href="#projects">
                <button>
                    LEARN MORE
                </button>
            </a>
            <a href="#contact">
                <button>
                    HIRE
                </button>
            </a>
        </div>
    </div>
    <div class="info">
        <p>My name is Lubos.<br>
            I’m 27 years old.<br>
            I’ve been working as Business Analyst for 5 years.<br>
            Currently I’m on my way to become full-stack developer.<br>
            Wanna check out my journey?<br>
            Go explore this web!
        </p>
    </div>
</div>
