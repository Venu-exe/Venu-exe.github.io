// Navigation Logic
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section-card');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        activateSection(targetId);
    });
});

function activateSection(sectionId) {
    sections.forEach(sec => {
        sec.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Update nav links
        navLinks.forEach(link => {
            if (link.getAttribute('href').substring(1) === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // If entering terminal, auto focus terminal input
        if (sectionId === 'terminal') {
            setTimeout(() => {
                document.getElementById('term-input').focus();
            }, 100);
        }
    }
}

// Matrix Digital Rain
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Binary & Katakana characters
const chars = '010101010101010101010101010101010101010101ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテト';
const charArr = chars.split('');
const fontSize = 14;
const columns = width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 8, 12, 0.04)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#00ff66';
    ctx.font = fontSize + 'px "Share Tech Mono", monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

let matrixInterval = setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const newColumns = width / fontSize;
    const currentLen = drops.length;
    if (newColumns > currentLen) {
        for (let i = currentLen; i < newColumns; i++) {
            drops[i] = 1;
        }
    }
});


// Terminal Simulator
const termInput = document.getElementById('term-input');
const termBody = document.getElementById('term-body');
const termOutput = termBody.querySelector('.terminal-output');

// Focus terminal input when clicking anywhere inside the terminal window
document.querySelector('.terminal-window').addEventListener('click', () => {
    termInput.focus();
});

const commandHistory = [];
let historyIndex = -1;

termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = termInput.value.trim();
        termInput.value = '';
        if (cmd) {
            commandHistory.push(cmd);
            historyIndex = commandHistory.length;
            executeCommand(cmd);
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            termInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            termInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            termInput.value = '';
        }
    }
});

function printLine(text, type = '') {
    const p = document.createElement('p');
    if (type) {
        p.className = type;
    }
    p.innerHTML = text;
    termOutput.appendChild(p);
    termBody.scrollTop = termBody.scrollHeight;
}

const commands = {
    help: () => {
        printLine('Available Commands:', 'text-highlight');
        printLine('  <span class="text-success">about</span>      - Read Venu\'s operational profile');
        printLine('  <span class="text-success">skills</span>     - Review technical capabilities & tools');
        printLine('  <span class="text-success">projects</span>   - Audit code repositories');
        printLine('  <span class="text-success">scan</span>       - Trigger simulated Nmap/Subdomain reconnaissance');
        printLine('  <span class="text-success">exploit</span>    - Launch mock penetration payload modules');
        printLine('  <span class="text-success">clear</span>      - Clean console history');
        printLine('  <span class="text-success">hackerone</span>  - Open HackerOne vulnerability portal');
        printLine('  <span class="text-success">bugcrowd</span>   - Open Bugcrowd reporting page');
    },
    about: () => {
        printLine('--- TARGET PROFILE: VENU-EXE ---', 'text-highlight');
        printLine('Location: Tiruvannamalai, Tamil Nadu, India');
        printLine('Operational Ethos: Ethical Hacking Only · Responsible Disclosure · No Harm.');
        printLine('Mission: Finding vulnerabilities before the bad guys do. Writing secure code.');
        printLine('Active bounty hunter targeting corporate web assets & writing customized automation.');
    },
    skills: () => {
        printLine('--- ARSENAL INVENTORY ---', 'text-highlight');
        printLine('Python Scripting    : [████████████████░░] 80%');
        printLine('Bash Scripting      : [███████████████░░░] 75%');
        printLine('Web App Security    : [█████████████████░] 85%');
        printLine('Bug Bounty Hunting  : [████████████████░░] 80%');
        printLine('Recon Automation    : [██████████████████] 90%');
        printLine('Learning Sectors    : Red Team (60%), SOC (55%), Mobile App (45%)');
    },
    projects: () => {
        printLine('--- AUDITING ACTIVE REPOSITORIES ---', 'text-highlight');
        printLine('1. <span class="text-success">ssh-bruteforce</span> [Python] - Threaded password audit tool.');
        printLine('2. <span class="text-success">Portscanner</span> [Python] - Socket based port scanner & banner grabber.');
        printLine('3. <span class="text-success">keylogger</span> [Python] - Keystroke recorder for security validation.');
        printLine('4. <span class="text-success">recon</span> [Python] - Subdomain, DNS, and open ports resolution script.');
        printLine('5. <span class="text-success">full-recon</span> [Shell] - Unified asset discovery wrap (Subfinder/HTTPX).');
        printLine('Type <span class="text-highlight">inspect [repo_name]</span> for simulated debug console (e.g. <span class="text-highlight">inspect Portscanner</span>).');
    },
    clear: () => {
        termOutput.innerHTML = '';
    },
    hackerone: () => {
        printLine('Redirecting to https://hackerone.com/venu-sh ...', 'text-success');
        window.open('https://hackerone.com/venu-sh', '_blank');
    },
    bugcrowd: () => {
        printLine('Redirecting to https://bugcrowd.com/h/venu-sh ...', 'text-success');
        window.open('https://bugcrowd.com/h/venu-sh', '_blank');
    },
    scan: () => {
        printLine('Initializing Recon module...', 'text-highlight');
        let lines = [
            '[*] Loading domains from asset list...',
            '[*] Launching Subfinder subdomain extraction...',
            '[+] sub.target.domain resolved -> 104.244.42.1',
            '[+] api.target.domain resolved -> 104.244.42.12',
            '[*] Executing port audit via custom Portscanner socket engine...',
            '[+] Port 80 (HTTP)  -> OPEN (Apache/2.4.41)',
            '[+] Port 443 (HTTPS) -> OPEN (OpenSSL/1.1.1d)',
            '[+] Port 22 (SSH)   -> OPEN (OpenSSH_8.2p1)',
            '[*] Resolving exposed configurations...',
            '[!] CRITICAL: /git/config directory listing found on api.target.domain!',
            '[+] Scan completed. 1 critical vulnerability found. Reports logged.'
        ];
        
        let index = 0;
        function printNextScanLine() {
            if (index < lines.length) {
                let isCritical = lines[index].includes('CRITICAL');
                let isSuccess = lines[index].includes('[+]');
                let styleType = isCritical ? 'text-error' : (isSuccess ? 'text-success' : 'text-mute');
                printLine(lines[index], styleType);
                index++;
                setTimeout(printNextScanLine, 400);
            }
        }
        printNextScanLine();
    },
    exploit: () => {
        printLine('Loading exploit payloads database...', 'text-highlight');
        let lines = [
            '[*] Constructing HTTP Request Smuggling smuggling chain...',
            '[*] Forwarding malformed Transfer-Encoding headers to proxy...',
            '[*] Backend parsing mismatch identified (CL.TE anomaly)...',
            '[+] Capture Session Token: sess_9f81a8c9d0901abcf8...',
            '[*] Impersonating administrative identity...',
            '[+] Security level bypassed. Shell access acquired.',
            '[+] EXPLOIT STAGE COMPLETE. Terminal access simulated.'
        ];
        
        let index = 0;
        function printNextExploitLine() {
            if (index < lines.length) {
                let isSuccess = lines[index].includes('[+]');
                printLine(lines[index], isSuccess ? 'text-success' : 'text-mute');
                index++;
                setTimeout(printNextExploitLine, 500);
            }
        }
        printNextExploitLine();
    }
};

function executeCommand(inputLine) {
    printLine(`guest@venu-shell:~$ ${inputLine}`, 'text-mute');
    
    const parts = inputLine.split(' ');
    const cmd = parts[0].toLowerCase();
    
    if (cmd === 'inspect') {
        if (parts[1]) {
            inspectProjectLogs(parts[1].toLowerCase());
        } else {
            printLine('Error: Specify which project repository to inspect. Usage: inspect [project_name]', 'text-error');
        }
    } else if (commands[cmd]) {
        commands[cmd]();
    } else {
        printLine(`Command not found: ${cmd}. Type <span class="text-highlight">help</span> for assistance.`, 'text-error');
    }
}

// Simulated inspect logs for projects
const projectInspectLogs = {
    'ssh-bruteforce': [
        '[*] Launching ssh-bruteforce.py...',
        '[*] Target Host: 192.168.1.45:22',
        '[*] Thread Count: 16 threads active',
        '[*] Loading wordlist: rockyou.txt (14,344,392 entries)',
        '[-] Attempt [admin/password123] - Failed',
        '[-] Attempt [root/toor] - Failed',
        '[-] Attempt [security/p@ssword] - Failed',
        '[+] Found credentials on thread 4 after 42 attempts!',
        '[+] Match Found: user="sysadmin" pass="hunter2"',
        '[*] Establishing persistent channel... Connection verified.',
        '[*] Execution finished.'
    ],
    'portscanner': [
        '[*] Launching Portscanner...',
        '[*] Target IP: 8.8.8.8',
        '[*] Scanning ports 1 through 1024...',
        '[-] Port 21 (FTP) - CLOSED',
        '[-] Port 22 (SSH) - CLOSED',
        '[+] Port 53 (DNS) - OPEN (BIND 9.11.3)',
        '[-] Port 80 (HTTP) - CLOSED',
        '[+] Port 443 (HTTPS) - OPEN (Google Frontend)',
        '[*] Scan complete. Found 2 open ports in 1.4 seconds.'
    ],
    'keylogger': [
        '[*] Initializing keylogger interceptor...',
        '[*] Hooking Windows keyboard subsystem (SetWindowsHookExA)...',
        '[*] Operational log file: %TEMP%\\win_system_log.txt',
        '[Log] [SHIFT]H[SHIFT]e[SHIFT]l[SHIFT]l[SHIFT]o[SHIFT] [SHIFT]W[SHIFT]o[SHIFT]r[SHIFT]l[SHIFT]d[SHIFT]',
        '[Log] [BACKSPACE] [ENTER]',
        '[Log] Gmail credentials typed:',
        '[Log] Username: venu.security.sh@gmail.com',
        '[Log] Password: [HIDDEN_FOR_DISCLOSURE]',
        '[*] Email payload packaged. Sending SMTP transmission...',
        '[+] Log successfully dispatched. Local buffer wiped.'
    ],
    'recon': [
        '[*] Launching Python Recon Toolkit...',
        '[*] Scope Domain: example.com',
        '[*] Gathering DNS records (A, AAAA, MX, TXT, NS)...',
        '[+] MX: 10 mail.example.com',
        '[+] TXT: v=spf1 include:_spf.google.com ~all',
        '[*] Resolving IP history...',
        '[+] Active IP: 93.184.216.34 (EdgeCast CDN)',
        '[*] Fetching robots.txt file...',
        '[!] Found disallowed directories in robots.txt:',
        '    - /admin_portal/',
        '    - /dev/src/backup/',
        '[*] Port scanning targets... 80, 443 open. All tasks completed.'
    ],
    'full-recon': [
        '[*] Booting Bash Full-Recon Framework...',
        '[*] Tool suite dependencies: Subfinder, Amass, Httpx, Nmap, GoSpider',
        '[*] Stage 1: Running passive subdomain analysis...',
        '[+] Found 12 subdomains via subfinder.',
        '[+] Found 8 subdomains via amass.',
        '[*] Stage 2: Verification of live web interfaces...',
        '[+] Live: http://test.example.com [200 OK]',
        '[+] Live: https://vpn.example.com [403 Forbidden]',
        '[*] Stage 3: Port auditing and crawler activation...',
        '[*] Results exported to /home/venu/Projects/portfolio/reports/recon_report.json',
        '[+] Done. Execution finished in 22 seconds.'
    ],
    'profile': [
        '[*] Loading Venu-exe Github Profile configuration...',
        '[*] Handle: Venu-exe',
        '[*] Repositories: 6 public repositories audited.',
        '[*] Pinned work confirmed. Integration operational.',
        '[+] Status: Fully loaded and synced.'
    ]
};

function inspectProjectLogs(repoName) {
    const logs = projectInspectLogs[repoName];
    if (logs) {
        printLine(`--- LOG FILE AUDIT: ${repoName.toUpperCase()} ---`, 'text-highlight');
        let idx = 0;
        function printNextLog() {
            if (idx < logs.length) {
                let line = logs[idx];
                let type = 'text-mute';
                if (line.includes('[+]')) type = 'text-success';
                if (line.includes('[!]')) type = 'text-error';
                printLine(line, type);
                idx++;
                setTimeout(printNextLog, 250);
            }
        }
        printNextLog();
    } else {
        printLine(`Error: Log file not found for repository '${repoName}'.`, 'text-error');
        printLine('Available: ssh-bruteforce, portscanner, keylogger, recon, full-recon, profile', 'text-mute');
    }
}

function simulateInspect(repoName) {
    activateSection('terminal');
    commands.clear();
    setTimeout(() => {
        inspectProjectLogs(repoName);
    }, 600);
}

// Contact form submission simulator
function handleContactSubmit(event) {
    event.preventDefault();
    const submitBtn = document.getElementById('submit-btn');
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const msg = document.getElementById('contact-msg').value;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="btn-text blink"><i class="fa-solid fa-spinner"></i> ENCRYPTING...</span>';

    // Simulate sending through terminal logs
    activateSection('terminal');
    commands.clear();
    
    setTimeout(() => {
        printLine('--- ESTABLISHING PGP SECURE CHANNEL ---', 'text-highlight');
        printLine(`[*] Target Handshake: Venu-exe Fingerprint MATCHED`, 'text-mute');
    }, 400);

    setTimeout(() => {
        printLine(`[*] Packaging transmission package for ${name}...`, 'text-mute');
        printLine(`[*] Return address: ${email}`, 'text-mute');
    }, 1200);

    setTimeout(() => {
        printLine('[*] Encrypting content with RSA-4096 public key...', 'text-mute');
        printLine('[*] Dispatching payload through Tor routing network...', 'text-mute');
    }, 2200);

    setTimeout(() => {
        printLine('[+] Payload transmitted successfully!', 'text-success');
        printLine('[+] Code: 200 OK. Connection terminated.', 'text-success');
        
        // Reset form
        document.getElementById('contact-form').reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-text"><i class="fa-solid fa-paper-plane"></i> TRANSMIT</span>';
    }, 3200);
}
