const commandInput = document.getElementById('command-input');
const terminalContent = document.querySelector('.terminal-content');

commandInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleCommand();
    }
});

function handleCommand() {
    const input = commandInput.value.trim();
    if (input !== '') {
        displayCommand(input);
        processCommand(input);
        commandInput.value = '';
    }
}

function displayCommand(command) {
    const commandElement = document.createElement('div');
    commandElement.classList.add('terminal-command');
    commandElement.textContent = `guest@abdullahancerli:${getCurrentDirectory()}$ ${command}`;
    terminalContent.appendChild(commandElement);
}

const directories = {
    'Anasayfa': {
        message: 'Anasayfa dizinindesiniz.',
        subdirectories: ['Hakkımda', 'İletişim', 'Linux']
    },
    'Anasayfa/Hakkımda': {
        message: '',
        subdirectories: []
    },
    'Anasayfa/İletişim': {
        message: '',
        subdirectories: []
    },
    'Anasayfa/Linux': {
        message: '',
        subdirectories: []
    }
};

let defaultDirectory = 'Anasayfa';
let currentDirectory = defaultDirectory;

let defaultMessageShown = true;

function processCommand(command) {
    const output = document.createElement('div');
    output.classList.add('terminal-command', 'output');

    const [cmd, arg] = command.split(' ');

    switch (cmd) {
        case 'komutlar':
            output.innerHTML = `
                <div>ls: Dizin içeriğini listeler.</div>
                <br>
                <div>cd: Dizinler arasında gezinmeyi sağlar. Örneğin: cd 'DizinAdı' </div>
                <br>
                <div>pwd: Bulunduğunuz dizini gösterir.</div>
                <br>
                <div>clear: Ekranı temizler.</div>
                <br>
            `;
            break;
        case 'ls':
            const currentDir = directories[currentDirectory];
            if (currentDir.subdirectories.length === 0) {
                output.textContent = 'Dizin boş.';
            } else {
                output.innerHTML = currentDir.subdirectories.map(item => item + '<br>').join(' ');
            }
            break;
        case 'pwd':
            output.textContent = `Bulunduğunuz dizin: ${currentDirectory}`;
            break;
        case 'cd':
            if (arg === '..') {
                // Bir üst dizine geç
                if (currentDirectory !== defaultDirectory) {
                    currentDirectory = currentDirectory.substring(0, currentDirectory.lastIndexOf('/'));
                    output.textContent = 'Üst dizine geçildi.';
                } else {
                    output.textContent = 'Bu dizin en üst dizindir.';
                }
            } else if (directories.hasOwnProperty(`${currentDirectory}/${arg}`)) {
                currentDirectory = `${currentDirectory}/${arg}`;
                const message = directories[currentDirectory].message;
                output.textContent = `'${arg}' dizinine girildi.`;
            } else {
                output.textContent = `'${arg}' geçersiz bir dizindir. Dizin adını doğru yazdığından emin olun!`;
            }
            break;
        case 'clear':
            clearTerminal();
            return;
        default:
            output.textContent = `'${command}' geçersiz bir komuttur. Komutlar için 'komutlar' komutunu deneyin.`;
            break;
    }

    terminalContent.appendChild(output);
    terminalContent.scrollTop = terminalContent.scrollHeight;
    
    if (defaultMessageShown) {
        const defaultMessage = document.querySelector('.default-message');
        if (defaultMessage) {
            defaultMessage.remove();
            defaultMessageShown = false;
        }
    }
    
    if (currentDirectory === 'Anasayfa/İletişim') {
        const linkOutput = document.createElement('div');
        linkOutput.classList.add('terminal-command', 'output', 'links', 'center');
        linkOutput.innerHTML = `
            <div class="message">
                <a href="https://www.instagram.com/abdullahancerli" target="_blank"><i class="fab fa-instagram fa-3x"></i></a>
                <a href="https://twitter.com/abdullahancerli" target="_blank"><i class="fab fa-twitter fa-3x"></i></a>
                <a href="https://github.com/abdullahancerli" target="_blank"><i class="fab fa-github fa-3x"></i></a>
                <a href="https://www.linkedin.com/in/abdullahancerli" target="_blank"><i class="fab fa-linkedin fa-3x"></i></a>
            </div>
        `;
        terminalContent.appendChild(linkOutput);
    }
    if (currentDirectory === 'Anasayfa/Hakkımda') {
        const linkOutput = document.createElement('div');
        linkOutput.classList.add('terminal-command', 'output', 'links', 'center');
        linkOutput.innerHTML = `
            <div class="message">
                <p style="color: green";> > Merhaba! Ben Abdullah, siber güvenlik alanına ilgi duyuyorum.</p>
                <p style="color: green";> > Linux, Python, C#, SQL, HTML5 ve CSS3 ile çalışıyorum.</p>
            </div>
        `;
        terminalContent.appendChild(linkOutput);
    }
    if (currentDirectory === 'Anasayfa/Linux') {
        const linkOutput = document.createElement('div');
        linkOutput.classList.add('terminal-command', 'output', 'links', 'center');
        linkOutput.innerHTML = `
            <div class="message">
                <p style="color: green";> > KAPALIYIZ </p>
                <p style="color: green";> > Temel Linux bilgisi için geliştiriliyor.. </p>
            </div>
        `;
        terminalContent.appendChild(linkOutput);
    }
}

function clearTerminal() {
    const commands = terminalContent.querySelectorAll('.terminal-command');
    commands.forEach(command => command.remove());
}

function getCurrentDirectory() {
    return currentDirectory === defaultDirectory ? '~' : currentDirectory.replace(`${defaultDirectory}/`, '');
}
