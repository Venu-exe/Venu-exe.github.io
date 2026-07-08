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

let matrixColor = '#00ff66';

function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 8, 12, 0.04)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = matrixColor;
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
        printLine('  <span class="text-success">timeline</span>   - Load cybersecurity journey milestones');
        printLine('  <span class="text-success">sysinfo</span>    - Print diagnostic system information');
        printLine('  <span class="text-success">theme</span>      - Change shell UI theme (e.g. <span class="text-highlight">theme cyberpunk</span>)');
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
    sysinfo: () => {
        printLine('--- DIAGNOSTIC SYSTEM INFO ---', 'text-highlight');
        printLine('Host OS          : Arch Linux x86_64');
        printLine('Active Shell     : Bash 5.2.15 (venu@security)');
        printLine('Tunnel Status    : Encrypted TLS/DNSSEC');
        const activeTheme = document.body.className.replace('-theme', '');
        printLine(`System Theme     : ${activeTheme.charAt(0).toUpperCase() + activeTheme.slice(1)}`);
    },
    timeline: () => {
        printLine('--- JOURNEY TIMELINE ---', 'text-highlight');
        printLine('2026: Built and integrated automated recon suite (full-recon).');
        printLine('2025: Logged private and public disclosures on HackerOne/Bugcrowd.');
        printLine('2024: Published Python security tools (ssh-bruteforce, keylogger, Portscanner).');
        printLine('2023: Initiated studies in cybersecurity, Python, Bash, networking.');
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
    } else if (cmd === 'theme') {
        if (parts[1]) {
            const requested = parts[1].toLowerCase();
            if (['matrix', 'cyberpunk', 'glacier', 'amber'].includes(requested)) {
                changeTheme(requested);
                printLine(`Theme switched to ${requested}.`, 'text-success');
            } else {
                printLine('Error: Invalid theme name. Options: matrix, cyberpunk, glacier, amber', 'text-error');
            }
        } else {
            printLine('Error: Specify theme name. Usage: theme [matrix/cyberpunk/glacier/amber]', 'text-error');
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
        '<span class="term-prompt">guest@venu-shell:~$</span> python3 ssh-bruteforce.py -h 192.168.1.45 -u sysadmin -w rockyou.txt',
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
        '<span class="term-prompt">guest@venu-shell:~$</span> python3 portscanner.py -t 8.8.8.8 -p 1-1024',
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
        '<span class="term-prompt">guest@venu-shell:~$</span> python3 keylogger.py --log-file win_system_log.txt',
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
        '<span class="term-prompt">guest@venu-shell:~$</span> python3 recon.py -d example.com',
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
        '<span class="term-prompt">guest@venu-shell:~$</span> ./full-recon.sh -d example.com',
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
        '<span class="term-prompt">guest@venu-shell:~$</span> gh repo view Venu-exe/Venu-exe.github.io',
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
                if (line.startsWith('<span')) {
                    type = ''; // preserve terminal prompt style
                } else {
                    if (line.includes('[+]')) type = 'text-success';
                    if (line.includes('[!]')) type = 'text-error';
                }
                printLine(line, type);
                idx++;
                setTimeout(printNextLog, 120);
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
    }, 400);
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

// Theme Switcher Implementation
function changeTheme(themeName) {
    // Remove existing themes
    document.body.classList.remove('matrix-theme', 'cyberpunk-theme', 'glacier-theme', 'amber-theme');
    
    // Add selected theme
    document.body.classList.add(`${themeName}-theme`);
    
    // Sync dropdown value
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.value = themeName;
    }
    
    // Read style variables safely after CSS updates
    setTimeout(() => {
        matrixColor = getComputedStyle(document.body).getPropertyValue('--primary-color').trim() || '#00ff66';
    }, 50);
    
    printLine(`[*] System color scheme configured: ${themeName.toUpperCase()}`, 'text-mute');
}

// Initializing Default Theme and Database on Load
document.addEventListener('DOMContentLoaded', () => {
    changeTheme('matrix');
    
    // Check auth status
    const isAuthed = sessionStorage.getItem('cyber_auth');
    if (isAuthed === 'true') {
        const panel = document.getElementById('login-panel');
        if (panel) panel.classList.add('hidden');
    } else {
        // Focus login key on start
        setTimeout(() => {
            const loginKey = document.getElementById('login-key');
            if (loginKey) loginKey.focus();
        }, 100);
    }
    
    // Initialise Local DB
    initDatabase();
});

// --- SIMULATED LOGIN MODULE ---
function printLoginLog(text, type = '') {
    const logsContainer = document.getElementById('login-logs');
    if (!logsContainer) return;
    const p = document.createElement('p');
    if (type) p.className = type;
    p.innerHTML = text;
    logsContainer.appendChild(p);
    logsContainer.scrollTop = logsContainer.scrollHeight;
}

function handleLoginAttempt() {
    const userVal = document.getElementById('login-user').value.trim();
    const keyVal = document.getElementById('login-key').value.trim();
    const loginBtn = document.getElementById('login-btn');
    const logsContainer = document.getElementById('login-logs');
    
    if (!logsContainer) return;
    logsContainer.innerHTML = ''; // Clear logs
    
    printLoginLog('[*] Contacting authorization gateway...', 'text-mute');
    
    // Enforcing credentials for simulation (User: admin, Passkey: security)
    if (userVal === 'admin' && keyVal === 'security') {
        loginBtn.disabled = true;
        
        setTimeout(() => {
            printLoginLog('[+] Credentials authenticated.', 'text-success');
            printLoginLog('[*] Loading operational workspace key...', 'text-mute');
        }, 600);
        
        setTimeout(() => {
            printLoginLog('[*] Decrypting database hashes...', 'text-mute');
            printLoginLog('[+] SHA-256 validation complete.', 'text-success');
        }, 1400);
        
        setTimeout(() => {
            printLoginLog('[*] Establishing encrypted tunnel...', 'text-mute');
            printLoginLog('[+] Session active. Access Granted.', 'text-success');
        }, 2200);
        
        setTimeout(() => {
            // Store authorization status
            sessionStorage.setItem('cyber_auth', 'true');
            const panel = document.getElementById('login-panel');
            if (panel) {
                panel.classList.add('hidden');
            }
            
            // Auto focus main terminal once logged in
            const mainTermInput = document.getElementById('term-input');
            if (mainTermInput) mainTermInput.focus();
        }, 3000);
        
    } else {
        setTimeout(() => {
            printLoginLog('[!] ACCESS DENIED: Invalid key configuration.', 'text-error');
        }, 800);
    }
}

// Add enter key listener on login inputs
document.getElementById('login-key')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleLoginAttempt();
    }
});


// --- LOCALSTORAGE ASSETS DATABASE MODULE ---
let localDatabase = [];

function initDatabase() {
    const rawData = localStorage.getItem('venu_assets');
    if (rawData) {
        localDatabase = JSON.parse(rawData);
    } else {
        // Seed default database targets
        localDatabase = [
            { ip: '192.168.1.1', scope: 'internal-gateway.local', status: 'safe' },
            { ip: '10.0.0.5', scope: 'dev-database.internal', status: 'unscanned' },
            { ip: '172.16.42.12', scope: 'api.target-scope.com', status: 'critical' }
        ];
        saveDatabase();
    }
    renderDatabase();
}

function saveDatabase() {
    localStorage.setItem('venu_assets', JSON.stringify(localDatabase));
}

function renderDatabase() {
    const tbody = document.getElementById('db-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (localDatabase.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center;" class="text-mute">Database is empty. Add a target asset.</td></tr>`;
        return;
    }
    
    localDatabase.forEach((target, index) => {
        const tr = document.createElement('tr');
        
        // Status Badge Style
        let badgeClass = 'unscanned';
        let statusLabel = 'Unscanned';
        if (target.status === 'safe') { badgeClass = 'safe'; statusLabel = 'Verified Safe'; }
        else if (target.status === 'warning') { badgeClass = 'warning'; statusLabel = 'Low Severity'; }
        else if (target.status === 'critical') { badgeClass = 'critical'; statusLabel = 'Critical Anomaly'; }
        
        tr.innerHTML = `
            <td><span class="text-highlight">${target.ip}</span></td>
            <td>${target.scope}</td>
            <td><span class="status-badge ${badgeClass}">${statusLabel}</span></td>
            <td>
                <button class="inspect-btn" onclick="deleteDbTarget(${index})" style="padding: 0.2rem 0.5rem;"><i class="fa-solid fa-trash"></i> Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function handleDbAdd(event) {
    event.preventDefault();
    const ip = document.getElementById('db-ip').value.trim();
    const scope = document.getElementById('db-scope').value.trim();
    const status = document.getElementById('db-status').value;
    
    localDatabase.push({ ip, scope, status });
    saveDatabase();
    renderDatabase();
    
    document.getElementById('db-target-form').reset();
}

function deleteDbTarget(index) {
    localDatabase.splice(index, 1);
    saveDatabase();
    renderDatabase();
}

function clearDb() {
    localDatabase = [];
    saveDatabase();
    renderDatabase();
}

function auditAllDbTargets() {
    activateSection('terminal');
    commands.clear();
    
    printLine('--- INITIALIZING AUDIT ON REGISTRY ASSETS ---', 'text-highlight');
    
    if (localDatabase.length === 0) {
        printLine('[!] Error: No targets registered in database.', 'text-error');
        return;
    }
    
    printLine(`[*] Auditing ${localDatabase.length} asset entries...`, 'text-mute');
    
    let delay = 600;
    localDatabase.forEach((target, index) => {
        setTimeout(() => {
            printLine(`[*] Auditing ${target.ip} (${target.scope})...`, 'text-mute');
        }, delay);
        
        delay += 600;
        
        setTimeout(() => {
            if (target.status === 'unscanned') {
                // Randomly assign a new audited status
                const rand = Math.random();
                if (rand < 0.5) {
                    target.status = 'safe';
                    printLine(`[+] Audit complete on ${target.ip} -> Safe (No ports exposed)`, 'text-success');
                } else if (rand < 0.8) {
                    target.status = 'warning';
                    printLine(`[!] Audit complete on ${target.ip} -> Warning (Exposed SMB/Telnet)`, 'text-error');
                } else {
                    target.status = 'critical';
                    printLine(`[!] Audit complete on ${target.ip} -> Critical (Request Smuggling vuln)`, 'text-error');
                }
                saveDatabase();
                renderDatabase();
            } else {
                printLine(`[*] Asset ${target.ip} is already verified as ${target.status.toUpperCase()}.`, 'text-mute');
            }
        }, delay);
        
        delay += 600;
    });
    
    setTimeout(() => {
        printLine('[+] Audit complete. Database updated.', 'text-success');
    }, delay);
}
