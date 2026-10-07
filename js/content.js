/*
 * CloudCore Trainee Academy - course content
 * ------------------------------------------
 * Everything the site shows lives in this one file.
 * Easiest way to edit: open the site, turn on "Edit mode", change things,
 * then click "Export content.js" and replace this file in the repo.
 *
 * Shape:
 *   chapter  = { id, num, title, he, duration, mode, icon, color, intro,
 *                sections[], activities[], labs[], test }
 *   section  = { title, he?, terms: [{ t, d }], quiz: [{ q, o: [..], a, e }] }
 *              t = term, d = definition, q = question, o = options,
 *              a = index of the correct option (0-based), e = explanation
 *   lab      = { title, he?, kind: "internal" | "external" | "interactive" | "checklist",
 *                url?, desc, steps?: [..], activities?: [..] }
 *   test     = { url, questions: [ same as quiz ] }  -> empty = placeholder
 *   activity = { type: "sort" | "pick" | "terminal" | "raid" | "order" | "match" | "memory"
 *                       | "truefalse" | "fill" | "subnet" | "chmod" | "blitz"
 *                       | "connections" | "wordguess" | "pinpoint", ... }
 */
window.COURSE = {
  title: "CloudCore Trainee Academy",
  version: 1,
  chapters: [
    {
      id: "welcome", num: 1, title: "Welcome to CloudCore", he: "היכרות", duration: "Day 1", mode: "Orientation",
      icon: "👋", color: "#9966FF",
      intro: "Welcome aboard! This academy walks you through everything a CloudCore engineer needs: networking, Linux, Windows, storage, NetApp, SAN, hardware, virtualization and backups. Each chapter is split into bite-sized subsections with term cards, mini quizzes, mini-games, labs and a chapter test. One important thing before you start: the cards are only the headline. For every term, go online and understand what really happens behind the scenes. Read the 'How to really learn' section!",
      sections: [
        {
          title: "How the training works",
          terms: [
            { t: "Chapter", d: "One knowledge domain (e.g. Linux, NetApp). Each chapter has a planned duration and is either theory only (עיוני) or theory + lab (עיוני + מעבדה)." },
            { t: "Term card", d: "Every concept you need to know, with a short definition on the back. It tells you WHAT the term is. It's your starting point, not the full knowledge (see the next section)." },
            { t: "Mini quiz", d: "2-4 quick multiple-choice questions after every subsection. Answer correctly to earn XP. You can retry as often as you like." },
            { t: "Lab", d: "Hands-on practice. Some labs run in the team's lab environment, some in outside labs (e.g. NetApp Lab on Demand, Linux playgrounds)." },
            { t: "Chapter test", d: "A test at the end of every chapter, written by the trainers. It checks that you understand how things work, not just the definitions." },
            { t: "All terms view", d: "Every chapter has a '📋 All terms' button that shows the whole chapter's terms on one page, with a 🔎 research shortcut next to each one. Great for revision." },
            { t: "Your progress", d: "Pick your name when you open the site, and your XP, cards, quizzes and labs are tracked per trainee. See them any time under '📈 My progress'." },
            { t: "Timeline", d: "About 6 months net, 7 months including buffers. It ends with a 2-week break-and-fix final lab and a shift + office week." }
          ],
          quiz: [
            { q: "What comes right after every subsection?", o: ["A chapter test", "A mini quiz", "A lab", "Nothing"], a: 1, e: "Every subsection ends with a short mini quiz. The chapter test comes at the end of the whole chapter." },
            { q: "How long is the full training, including buffers?", o: ["1 month", "3 months", "About 7 months", "2 years"], a: 2, e: "About 6 months net and 7 months including buffers." },
            { q: "What does עיוני + מעבדה mean for a chapter?", o: ["Theory only", "Theory and a hands-on lab", "Lab only", "Optional chapter"], a: 1, e: "עיוני = theory, מעבדה = lab." }
          ]
        },
        {
          title: "How to really learn (read this!)",
          terms: [
            { t: "Cards are the headline, not the story", d: "A card tells you a term exists and roughly what it is. That is NOT enough for the tests or for production. For every term, go online (vendor docs, articles, videos, RFCs) and learn how it works behind the scenes." },
            { t: "Understand the process", d: "Always ask: what happens step by step? Not just 'DHCP gives an IP', but: the client broadcasts a Discover, the server Offers, the client Requests, the server Acks. Who sends what, to whom, on which port, and what breaks when it fails." },
            { t: "Why does it exist?", d: "Every technology solves a problem. Know the problem it solves, the alternatives, and the trade-offs. Why RAID-DP and not RAID 5? Why a trunk and not 3 cables?" },
            { t: "Connect the dots", d: "Terms link across chapters: VLAN → vSwitch portgroup, RAID → NetApp aggregate, LUN → VMFS datastore, snapshot → backup. Draw how they fit together." },
            { t: "Explain it back", d: "If you can't explain a term in your own words, with a drawing on a whiteboard, you don't know it yet. Your mentor will ask you to, so practice on a teammate." },
            { t: "See it happen in the labs", d: "Labs let you watch the process for real: watch tables fill up, capture traffic, fail a disk, move a VM. Compare what you see with what you read." },
            { t: "🔎 Research shortcut", d: "In every chapter's '📋 All terms' view, each term has a 🔎 button that starts a web search for you. Use it, and keep your own notes." }
          ],
          quiz: [
            { q: "You flipped every card in the DHCP section. Are you done with DHCP?", o: ["Yes, I read the definition", "No: I still need to research how the DORA process works, step by step", "Yes, if I passed the quiz", "Only if I have time"], a: 1, e: "The card is the headline. You need to understand the process behind it: who broadcasts, who replies, and what happens across subnets (relay)." },
            { q: "Your mentor asks: 'How does ARP work?' What's the best answer?", o: ["Read the card definition out loud", "Explain the flow: a broadcast 'who has IP X?', a unicast reply with the MAC, and the result saved in the ARP cache", "Say it's in the cards", "Say it's a Layer-2 thing"], a: 1, e: "Understanding means explaining the process step by step, in your own words." },
            { q: "What should you do for EVERY term in the course?", o: ["Memorize the card", "Research it online and understand what happens behind the scenes, and why it exists", "Skip what isn't in the quiz", "Wait for the lab"], a: 1, e: "Cards + research + labs = real understanding." }
          ]
        },
        {
          title: "Lab rules",
          terms: [
            { t: "Mentor (חונך)", d: "Your personal guide during training. Try to solve problems on your own first; if you're stuck, ask your mentor or a teammate." },
            { t: "Lab environment", d: "The team's dev environment where you build things. Be bold and experiment, but never change existing configurations. Only touch what you created yourself." },
            { t: "Team standards", d: "Names, IP addresses and settings you create in labs must follow the team standard, because you will reuse them in later labs." },
            { t: "Team wiki", d: "The team's internal wiki. The original term lists for every chapter live there under 'הכשרת צוות CloudCore'." }
          ],
          quiz: [
            { q: "In the lab you see a vserver you didn't create, with a weird setting. What do you do?", o: ["Fix it", "Delete it", "Leave it alone and only touch what you created", "Reboot the cluster"], a: 2, e: "Golden rule: never change existing configurations. Only work on objects you created." },
            { q: "How should you name the objects you create in a lab?", o: ["Whatever you like", "According to the team standard, because you'll reuse them in later labs", "test1, test2…", "Copy a teammate's names"], a: 1, e: "Following the team standard keeps the lab tidy and lets later labs build on your work." },
            { q: "You're stuck on a lab step. What should you do first?", o: ["Give up", "Try to solve it alone (research it!), then ask your mentor or a teammate", "Skip the chapter", "Open a ticket with the vendor"], a: 1, e: "Trying on your own first is how you learn. Then ask for help." }
          ]
        }
      ],
      activities: [
        {
          "type": "truefalse",
          "title": "Myth Busters",
          "desc": "True or false? You have 3 lives ❤️❤️❤️. Lose them all and you start over.",
          "items": [
            {
              "s": "If I flipped all the cards in a section, I fully understand the topic.",
              "ok": false,
              "e": "Cards are only the headline. Research the process behind every term."
            },
            {
              "s": "It's fine to change an existing lab configuration if it looks wrong.",
              "ok": false,
              "e": "Never change what you didn't create. Only touch your own objects."
            },
            {
              "s": "I should try to solve a problem on my own before asking my mentor.",
              "ok": true,
              "e": "Try, research, then ask."
            },
            {
              "s": "The objects I create in labs should follow the team standard.",
              "ok": true,
              "e": "You'll reuse them in later labs."
            },
            {
              "s": "Drawing a process on a whiteboard is a good test of whether I understand it.",
              "ok": true,
              "e": "If you can explain it back, you know it."
            },
            {
              "s": "The chapter tests only check definitions.",
              "ok": false,
              "e": "They check that you understand how things work."
            }
          ]
        }
      ],
      labs: [],
      test: null
    },
    {
      id: "networking", num: 2, title: "Networking", he: "תקשורת", duration: "2 weeks", mode: "Theory + Lab",
      icon: "🌐", color: "#4C97FF",
      intro: "Every service the team runs depends on the network. You'll climb the OSI model one layer at a time, from cables and hubs up to DNS and SSH, and then build real topologies in Packet Tracer.",
      sections: [
        {
          title: "Network models & devices",
          terms: [
            { t: "OSI model (7 layers)", d: "A reference model that splits networking into 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. Each layer serves the one above it." },
            { t: "TCP/IP model (4 layers)", d: "The practical model the internet runs on: Link (Network Access), Internet, Transport, Application. It maps onto the OSI layers." },
            { t: "Encapsulation", d: "On the way down the stack, each layer wraps the data with its own header: Data → Segment (L4) → Packet (L3) → Frame (L2) → Bits (L1). The receiver removes the headers in reverse order." },
            { t: "Network device types", d: "Hub (L1, repeats bits to every port), Switch (L2, forwards frames by MAC), Router (L3, routes packets between networks by IP), Firewall (filters traffic by rules)." }
          ],
          quiz: [
            { q: "How many layers does the OSI model have?", o: ["4", "5", "7", "9"], a: 2, e: "Physical, Data Link, Network, Transport, Session, Presentation, Application." },
            { q: "What is the data unit called at Layer 3?", o: ["Frame", "Packet", "Segment", "Bit"], a: 1, e: "L2 = frame, L3 = packet, L4 = segment." },
            { q: "Which device forwards traffic between different IP networks?", o: ["Hub", "Switch", "Router", "Patch panel"], a: 2, e: "Routers work at Layer 3 and connect different networks." }
          ]
        },
        {
          title: "Layer 1 – Physical",
          terms: [
            { t: "Physical layer", d: "Moves raw bits over a medium: copper (electrical signals), fiber (light) or wireless (radio). It covers cables, connectors, voltages and speeds." },
            { t: "Cable types", d: "Copper twisted pair (Cat5e/6, RJ45), fiber optic (single-mode for long distances, multi-mode for short), and DAC/twinax for short links inside the rack." },
            { t: "HUB", d: "A Layer-1 device that repeats every incoming bit out of all other ports. All ports share one collision domain. Mostly obsolete, replaced by switches." }
          ],
          quiz: [
            { q: "A hub receives a frame on port 1. Where does it send it?", o: ["Only to the destination port", "Out of all other ports", "Back to port 1", "To the router"], a: 1, e: "A hub doesn't understand addresses. It repeats bits everywhere." },
            { q: "Which cable is best for long distances between buildings?", o: ["Cat5e copper", "Single-mode fiber", "USB", "Coax"], a: 1, e: "Single-mode fiber carries light over many kilometers." }
          ]
        },
        {
          title: "Layer 2 – Data Link",
          terms: [
            { t: "MAC address", d: "A 48-bit hardware address written in hex (e.g. 00:0C:CF:4A:12:16). The first 24 bits are the vendor ID (OUI). Used for delivery inside the same L2 network." },
            { t: "MAC Flapping", d: "When a switch learns the same MAC address on two different ports in quick succession. It usually means a loop or a misconfigured NIC team/bond." },
            { t: "L2 Switch", d: "Learns which MAC lives behind which port (the MAC address table) and forwards frames only to the right port. Unknown destinations and broadcasts are flooded." },
            { t: "Switch Stacking", d: "Several physical switches connected with stack cables so they work and are managed as one logical switch." },
            { t: "STP (Spanning Tree Protocol)", d: "Prevents Layer-2 loops by blocking redundant links. If an active link fails, a blocked one is unblocked automatically." },
            { t: "VLAN", d: "Virtual LAN. Splits one physical switch into several isolated broadcast domains. Separate VLANs = separate broadcast domains = separate networks." },
            { t: "Access port", d: "A switch port that belongs to a single VLAN and sends untagged frames, usually toward an end device like a PC or server." },
            { t: "Trunk port", d: "A switch port that carries many VLANs over one link. Frames are tagged with an 802.1Q VLAN ID so the other side knows which VLAN they belong to." },
            { t: "Native VLAN", d: "The one VLAN on a trunk whose frames cross untagged. It must match on both ends of the trunk." },
            { t: "LACP / Port channeling", d: "Bundles several physical links into one logical link (port-channel / EtherChannel) for more bandwidth and redundancy. LACP is the standard negotiation protocol." }
          ],
          quiz: [
            { q: "What does a switch use to decide which port to forward a frame to?", o: ["IP routing table", "MAC address table", "ARP table", "DNS"], a: 1, e: "Switches learn source MACs per port and forward by destination MAC." },
            { q: "Which protocol stops loops between switches?", o: ["LACP", "STP", "ARP", "DHCP"], a: 1, e: "Spanning Tree blocks redundant paths to prevent broadcast storms." },
            { q: "A link must carry VLAN 10, 20 and 30 between two switches. Configure it as…", o: ["Access port", "Trunk port", "Mirror port", "Shutdown"], a: 1, e: "A trunk carries several VLANs using 802.1Q tags." }
          ]
        },
        {
          title: "Layer 3 – Network",
          terms: [
            { t: "IP address & classes", d: "A 32-bit IPv4 address (e.g. 192.168.1.10). Historic classes: A (1-126), B (128-191), C (192-223), D multicast, E reserved. Today we use CIDR (/24, /16…)." },
            { t: "Subnet mask", d: "Marks which part of the IP is the network and which is the host. 255.255.255.0 = /24 means the first 24 bits are the network." },
            { t: "Default Gateway", d: "The router a host sends traffic to when the destination is outside its own subnet. Without it, a host can only talk to its own network." },
            { t: "Subnetting", d: "Splitting a network into smaller networks by borrowing host bits. A /26 gives 4 subnets of 64 addresses (62 usable hosts) out of one /24." },
            { t: "NAT", d: "Network Address Translation. A router rewrites private source IPs into a public IP (and back), so many hosts can share one public address." },
            { t: "Special addresses (localhost, Martians)", d: "127.0.0.1 = localhost (the machine itself). 'Martians' are packets with impossible source addresses (e.g. 127.x or 0.0.0.0 arriving from the network), which routers drop." },
            { t: "APIPA", d: "169.254.x.x. Windows gives itself this address when it can't reach a DHCP server. Seeing it usually means a DHCP problem." },
            { t: "Static Routing", d: "Routes you configure manually: 'to reach network X, send to next-hop Y'. Simple and predictable, but doesn't adapt to failures." },
            { t: "ICMP & Traceroute", d: "ICMP carries control messages like echo request/reply (ping) and 'TTL exceeded'. Traceroute raises the TTL by 1 each time to reveal every router hop." },
            { t: "ARP", d: "Address Resolution Protocol. Translates a known IP into a MAC address on the local network: a broadcast 'Who has 10.0.0.5?' gets a unicast reply with the MAC." },
            { t: "Dynamic Routing (IP Forwarding)", d: "Routers exchange routes automatically using protocols like OSPF or BGP and adapt when links fail. IP forwarding = a host passing packets between its interfaces." },
            { t: "DHCP", d: "Hands out IP, subnet mask, gateway and DNS automatically using DORA: Discover, Offer, Request, Ack. Across subnets you need a DHCP relay (ip helper-address)." },
            { t: "Firewall", d: "Allows or blocks traffic by rules (source/destination IP, port, protocol). Stateful firewalls track connections and allow the return traffic automatically." }
          ],
          quiz: [
            { q: "PC A (11.11.11.10/24) can't ping PC D (22.22.22.40/24) through a router. What's most likely missing on the PCs?", o: ["MAC address", "Default gateway", "DNS server", "Hostname"], a: 1, e: "Traffic to another subnet goes to the default gateway. Without one, the PC doesn't know where to send it." },
            { q: "A Windows server got the address 169.254.12.7. What does that tell you?", o: ["It's a public IP", "It couldn't reach a DHCP server", "It's localhost", "It's a multicast address"], a: 1, e: "169.254.x.x is APIPA, a self-assigned address used when DHCP fails." },
            { q: "How many usable hosts are in a /26?", o: ["30", "62", "64", "126"], a: 1, e: "2^6 = 64 addresses, minus network and broadcast = 62." },
            { q: "Which protocol finds the MAC address for a known IP?", o: ["DNS", "ARP", "ICMP", "NAT"], a: 1, e: "ARP maps IP to MAC on the local segment." }
          ]
        },
        {
          title: "Layer 4 – Transport",
          terms: [
            { t: "TCP", d: "Connection-oriented and reliable. Starts with a 3-way handshake (SYN, SYN-ACK, ACK), numbers the segments, acknowledges them, retransmits losses and controls the flow. Used by HTTP, SSH, SMB, iSCSI." },
            { t: "UDP", d: "Connectionless and lightweight: no handshake, no retransmission. Fast, but delivery isn't guaranteed. Used by DNS queries, DHCP, NTP, streaming and syslog." },
            { t: "Port number", d: "Identifies the application on a host (0-65535). Examples: 22 SSH, 23 Telnet, 53 DNS, 80 HTTP, 443 HTTPS, 3389 RDP, 123 NTP, 20/21 FTP." }
          ],
          quiz: [
            { q: "Which protocol uses a 3-way handshake?", o: ["UDP", "TCP", "ICMP", "ARP"], a: 1, e: "TCP: SYN → SYN-ACK → ACK." },
            { q: "DNS queries normally use…", o: ["UDP 53", "TCP 80", "UDP 123", "TCP 22"], a: 0, e: "DNS uses UDP port 53 (and TCP 53 for large responses and zone transfers)." }
          ]
        },
        {
          title: "Layer 5 – SSL & DNS",
          terms: [
            { t: "SSL / TLS", d: "Encrypts and authenticates a session using certificates. TLS is the modern version of SSL. It's the 'S' in HTTPS." },
            { t: "DNS", d: "Translates names into IP addresses (A record), and back again (PTR). A query goes to a resolver, which finds the authoritative server. Records are cached for their TTL." },
            { t: "DNS record types", d: "A (name → IPv4), AAAA (IPv6), CNAME (alias), PTR (reverse lookup), MX (mail), NS (name server)." }
          ],
          quiz: [
            { q: "Which DNS record maps a name to an IPv4 address?", o: ["MX", "PTR", "A", "CNAME"], a: 2, e: "A record = name → IPv4. PTR is the reverse." },
            { q: "What adds encryption to HTTP to make HTTPS?", o: ["DNS", "SSL/TLS", "NAT", "ARP"], a: 1, e: "HTTPS = HTTP over TLS." }
          ]
        },
        {
          title: "Layers 6-7 – Application protocols",
          terms: [
            { t: "Telnet", d: "Remote terminal on TCP 23. Everything, including passwords, is sent in clear text. Still handy for testing whether a TCP port is open." },
            { t: "SSH", d: "Secure Shell on TCP 22. Encrypted remote terminal and file transfer (scp/sftp). The standard way to manage Linux, ESXi and storage systems." },
            { t: "RDP", d: "Remote Desktop Protocol on TCP 3389. A graphical remote session to Windows (client: mstsc)." },
            { t: "HTTP / HTTPS", d: "The web protocol. HTTP uses TCP 80 (clear text) and HTTPS uses TCP 443 (encrypted with TLS)." },
            { t: "FTP", d: "File Transfer Protocol on TCP 20/21, in clear text. Remember the 'bin' (binary mode) and 'hash' (progress marks) commands." },
            { t: "NTP", d: "Network Time Protocol on UDP 123. Keeps clocks in sync, which is critical for logs, Kerberos/AD authentication, clusters and storage replication." }
          ],
          quiz: [
            { q: "You need an encrypted shell to a Linux server. Which protocol?", o: ["Telnet", "FTP", "SSH", "HTTP"], a: 2, e: "SSH (TCP 22) is encrypted. Telnet is clear text." },
            { q: "Clocks drift between cluster nodes and AD logins fail. Which protocol fixes this?", o: ["NTP", "DHCP", "RDP", "SNMP"], a: 0, e: "NTP synchronizes time. Kerberos breaks when clocks differ by more than about 5 minutes." },
            { q: "Which port does RDP use?", o: ["22", "443", "3389", "8080"], a: 2, e: "RDP = TCP 3389." }
          ]
        }
      ],
      activities: [
        {
          type: "sort", title: "Layer Sorter", desc: "Put each item on the OSI layer where it lives. Tap an item, then tap a layer (or drag it).",
          buckets: ["Layer 2 – Data Link", "Layer 3 – Network", "Layer 4 – Transport", "Layer 7 – Application"],
          items: [
            { text: "MAC address", b: 0 }, { text: "Switch", b: 0 }, { text: "VLAN tag", b: 0 },
            { text: "IP address", b: 1 }, { text: "Router", b: 1 }, { text: "ICMP / ping", b: 1 },
            { text: "TCP", b: 2 }, { text: "UDP", b: 2 }, { text: "Port number", b: 2 },
            { text: "HTTP", b: 3 }, { text: "DNS", b: 3 }, { text: "SSH", b: 3 }
          ]
        },
        {
          type: "pick", title: "Port Detective", desc: "Select every protocol that runs over TCP.",
          items: [
            { text: "SSH (22)", ok: true }, { text: "DNS query (53)", ok: false }, { text: "HTTPS (443)", ok: true },
            { text: "NTP (123)", ok: false }, { text: "RDP (3389)", ok: true }, { text: "DHCP (67/68)", ok: false },
            { text: "Telnet (23)", ok: true }, { text: "FTP (21)", ok: true }
          ]
        },
        {
          "type": "subnet",
          "title": "Subnet Sniper",
          "desc": "Each round gives you a random IP and prefix. Work out the mask, network, broadcast and usable hosts. Solve 5 subnets to win.",
          "rounds": 5
        },
        {
          "type": "memory",
          "title": "Port Memory",
          "desc": "Flip two cards at a time and match each protocol to its port. Fewer moves = more bragging rights.",
          "pairs": [
            [
              "SSH",
              "22"
            ],
            [
              "Telnet",
              "23"
            ],
            [
              "DNS",
              "53"
            ],
            [
              "HTTP",
              "80"
            ],
            [
              "HTTPS",
              "443"
            ],
            [
              "RDP",
              "3389"
            ],
            [
              "NTP",
              "123"
            ],
            [
              "SMB",
              "445"
            ]
          ]
        },
        {
          "type": "truefalse",
          "title": "Packet Myths",
          "desc": "True or false? 3 lives ❤️❤️❤️.",
          "items": [
            {
              "s": "A switch forwards frames based on IP addresses.",
              "ok": false,
              "e": "Switches forward by MAC address. Routers use IP."
            },
            {
              "s": "An ARP request is sent as a broadcast.",
              "ok": true,
              "e": "'Who has 10.0.0.5?' goes to everyone. The reply is unicast."
            },
            {
              "s": "Two PCs in different VLANs can talk without a router.",
              "ok": false,
              "e": "Different VLANs = different networks. You need L3 routing (e.g. router-on-a-stick)."
            },
            {
              "s": "TCP retransmits lost segments.",
              "ok": true,
              "e": "Reliability is TCP's job. UDP doesn't do it."
            },
            {
              "s": "A host without a default gateway can still reach hosts in its own subnet.",
              "ok": true,
              "e": "The gateway is only needed for other subnets."
            },
            {
              "s": "A 169.254.x.x address means the host got its address from DHCP.",
              "ok": false,
              "e": "It's APIPA: DHCP failed."
            },
            {
              "s": "Traceroute works by raising the TTL one hop at a time.",
              "ok": true,
              "e": "Each router that drops the packet replies with ICMP 'TTL exceeded'."
            },
            {
              "s": "Native VLAN frames cross a trunk tagged.",
              "ok": false,
              "e": "The native VLAN is the untagged one."
            }
          ]
        },
        {
          "type": "connections",
          "title": "Network Connections",
          "desc": "Find 4 groups of 4. Select four tiles and hit Submit. 4 mistakes allowed!",
          "groups": [
            {
              "name": "Layer 2 things",
              "items": [
                "MAC",
                "SWITCH",
                "VLAN",
                "STP"
              ]
            },
            {
              "name": "Layer 3 things",
              "items": [
                "IP",
                "ROUTER",
                "ICMP",
                "NAT"
              ]
            },
            {
              "name": "Runs over TCP",
              "items": [
                "SSH",
                "HTTPS",
                "RDP",
                "TELNET"
              ]
            },
            {
              "name": "Runs over UDP",
              "items": [
                "DNS QUERY",
                "NTP",
                "DHCP",
                "TFTP"
              ]
            }
          ]
        },
        {
          "type": "wordguess",
          "title": "Network Word Guess",
          "desc": "Guess the networking word in 6 tries. 🟩 = right spot, 🟨 = in the word, ⬜ = not in it.",
          "words": [
            {
              "w": "TRUNK",
              "hint": "A port that carries many VLANs"
            },
            {
              "w": "ROUTER",
              "hint": "Connects different IP networks"
            },
            {
              "w": "SUBNET",
              "hint": "A smaller slice of a network"
            },
            {
              "w": "PACKET",
              "hint": "The Layer 3 data unit"
            },
            {
              "w": "FRAME",
              "hint": "The Layer 2 data unit"
            },
            {
              "w": "SWITCH",
              "hint": "Forwards by MAC address"
            }
          ]
        },
        {
          "type": "pinpoint",
          "title": "Pinpoint",
          "desc": "Clues are revealed one at a time. Guess the term they all point to, using as few clues as you can!",
          "puzzles": [
            {
              "clues": [
                "Discover",
                "Offer",
                "Request",
                "Ack",
                "UDP 67/68"
              ],
              "answers": [
                "dhcp"
              ],
              "reveal": "DHCP: the DORA process hands out IP settings."
            },
            {
              "clues": [
                "Who has…?",
                "Broadcast",
                "Cache",
                "Reply with a MAC",
                "IP → MAC"
              ],
              "answers": [
                "arp"
              ],
              "reveal": "ARP resolves an IP to a MAC on the local network."
            },
            {
              "clues": [
                "SYN",
                "Handshake",
                "Sequence numbers",
                "Retransmit",
                "Reliable"
              ],
              "answers": [
                "tcp"
              ],
              "reveal": "TCP: connection-oriented and reliable."
            }
          ]
        },
        {
          "type": "blitz",
          "title": "Term Blitz",
          "desc": "60 seconds! Read the definition and hit the matching term. Score 10 to win.",
          "target": 10
        }
      ],
      labs: [
        {
          title: "Lab 1 – A packet's journey", he: "מעבדה בתקשורת נתונים - מעבדה מספר 1", kind: "internal",
          url: "https://www.netacad.com/cisco-packet-tracer",
          desc: "Use Cisco Packet Tracer to follow a message from PC A to PC D and fill in every table it touches along the way. Answer the questions in a separate file.",
          steps: [
            "Build Switch0 with PC A (`11.11.11.10/24`) on Fa0/2 and PC B (`11.11.11.20/24`) on Fa0/1. Ping A → B.",
            "What does the subnet mask do? What is the network ID here?",
            "Add Router0: Fa0/0 = `11.11.11.254`, Fa0/1 = `22.22.22.254` (/24). Connect Fa0/0 to Switch0 Fa0/4.",
            "Add Switch1 (connect to Router0 Fa0/1) with PC C (`22.22.22.30/24`) on Fa0/6 and PC D (`22.22.22.40/24`) on Fa0/5.",
            "Ping A → D. Does it work? What must you configure on the PCs so it does? Configure it.",
            "Fill in the tracking tables: Switch0 & Switch1 MAC tables, Router0 routing table, ARP tables of A, D and Router0.",
            "Simulation mode: follow the message from A to D. At each hop, write which header (L2/L3) is built, and its SRC/DST.",
            "Note every ARP request (broadcast) and ARP reply (unicast). Who receives each one, and which tables change?",
            "Pre-questions: role of a switch vs a router, what is a collision domain / broadcast domain, and how many of each are in this topology?",
            "Bonus: would the reply from D back to A take more or fewer steps? Why?"
          ]
        },
        {
          title: "Lab 2 – Router, DHCP, DNS & HTTP", he: "מעבדה בתקשורת נתונים - מעבדה מספר 2", kind: "internal",
          url: "https://www.netacad.com/cisco-packet-tracer",
          desc: "Configure a router between 3 networks, then add DHCP, DNS and HTTP servers, a DHCP relay, and watch a DNS query in simulation mode.",
          steps: [
            "Networks: Network1 `192.168.1.0/24`, Network2 `192.168.2.0/24`, Network3 `192.168.3.0/24`.",
            "Router0 interfaces: Fa0/0 `192.168.1.1`, Fa0/1 `192.168.2.1`, Fa1/0 `192.168.3.1` (all /24). Which address will be every host's default gateway?",
            "CLI: `enable` → `configure terminal` → `hostname R1` → `interface gigabitEthernet 0/0` → `ip address <ip> <mask>` → `no shut`. Save with `copy running-config startup-config`.",
            "Network1: add a DHCP server at `192.168.1.254`. What is its default gateway? DNS = `192.168.2.254`.",
            "Network2: add a DNS server at `192.168.2.254/24` (GW `192.168.2.1`).",
            "Network3: add an HTTP server at `192.168.3.254/24` (GW `192.168.3.1`, DNS `192.168.2.254`). Test connectivity between all servers.",
            "DHCP: what is it, how does it work, and which layer is it on? Create pool network1 (start `192.168.1.100`, GW, DNS) and pool network2 (start `192.168.2.100`).",
            "Set PC1 to DHCP. Did it get an address? Which one?",
            "Set PC3/PC4 (Network2) to DHCP. Does it work? If not, why? (Hint: what kind of message is a DHCP request?)",
            "Configure a DHCP relay on R1: `interface gigabitEthernet 0/1` → `ip helper-address <DHCP IP>`. Try again.",
            "Add pool network3 and a relay for Network3, then get addresses for PC5/PC6. Test connectivity with simple PDUs.",
            "HTTP: browse from PC1 to `http://<server ip>`. Then add a DNS record and browse by name. What did you need to change?",
            "Simulation: capture DNS + HTTP. Inspect the DNS Query and the DNS Answer. Which address came back?"
          ]
        },
        {
          title: "Lab 3 – VLANs, Trunks & Router-on-a-stick", he: "מעבדה בתקשורת נתונים - מעבדה מספר 3", kind: "internal",
          url: "https://www.netacad.com/cisco-packet-tracer",
          desc: "Learn VLANs, trunk links, native VLAN and inter-VLAN routing. Rules: answer in order, don't use the internet unless asked, and check the explanations at the end of the file.",
          steps: [
            "Pre-questions: what is a VLAN? Are `192.168.1.0/24` and `192.168.2.0/24` in the same broadcast domain? Which device separates broadcast domains?",
            "Scenario A: two switches; A (`172.16.1.10`, VLAN 10), B (`172.16.1.20`, VLAN 10), C (`172.16.2.10`, VLAN 20), D (`172.16.2.20`, VLAN 20). Can A talk to B? A to D? Why?",
            "Find and fix the broken config: `interface FastEthernet<port>` → `switchport access vlan <id>`.",
            "Scenario C: add E and F in VLAN 30 (university: 10 = management, 20 = students, 30 = lecturers). Why do we need 3 cables? Fix the connectivity faults.",
            "Trunk: list what you know about trunk ports, trunk vs access, and why trunks are useful.",
            "Replace the 3 cables with one trunk: `switchport mode trunk` → `end` → `wr`. Ping from PC-C to a PC in its own VLAN.",
            "Native VLAN: what is it, and what is the default? What happens if SW1 has native=33 and SW2 doesn't?",
            "Router-on-a-stick: comp A is `172.16.1.10/24` and comp F is `172.16.3.20/24`. What is each one's default gateway when the router has only one port?",
            "Research router-on-a-stick, configure the subinterfaces, and attach a screenshot of a ping between two different VLANs."
          ]
        },
        {
          title: "Packet Tracer download & free course", kind: "external",
          url: "https://www.netacad.com/courses/getting-started-cisco-packet-tracer",
          desc: "Free Cisco Networking Academy course and download for Packet Tracer, the simulator used in all networking labs."
        },
        {
          title: "Subnetting practice", kind: "external",
          url: "https://subnettingpractice.com/",
          desc: "Endless random subnetting questions. Great for warming up before the chapter test."
        }
      ],
      test: { url: "", questions: [] }
    },
    {
      id: "linux", num: 3, title: "Linux", he: "לינוקס", duration: "2 weeks", mode: "Theory + Lab",
      icon: "🐧", color: "#FFAB19",
      intro: "Most of the servers, appliances and hypervisor tools you'll work with speak Linux. Learn how the system is built, how to move around the shell, troubleshoot the network, and manage disks with LVM.",
      sections: [
        {
          title: "Basics – the system",
          terms: [
            { t: "Operating system", d: "Software that manages the hardware (CPU, RAM, disks, NICs) and gives programs services. Linux = kernel + userland tools. Common distros here: RHEL / CentOS / Rocky." },
            { t: "MobaXterm, PuTTY", d: "Windows SSH clients used to connect to Linux servers. MobaXterm adds tabs, SFTP browsing and X11." },
            { t: "Permission model", d: "Every file has an owner, a group and 'others', each with r (4), w (2) and x (1) permissions. Example: 754 = rwx r-x r--." },
            { t: "root user & user management", d: "root (UID 0) can do anything. Manage users with useradd, passwd, usermod -aG, userdel, and groups with groupadd. Users are stored in /etc/passwd and passwords in /etc/shadow." },
            { t: "RPM, YUM", d: "RPM is the Red Hat package format and low-level tool (rpm -qa, rpm -ivh). YUM/DNF is the package manager that resolves dependencies from repositories (/etc/yum.repos.d)." },
            { t: "BOOT process", d: "BIOS/UEFI → bootloader (GRUB2) → kernel + initramfs → systemd (PID 1) → targets/services → login." },
            { t: "i-nodes", d: "Data structures that store a file's metadata (owner, permissions, size, pointers to data blocks), but not its name. A filesystem can run out of inodes even when it has free space (check with df -i)." },
            { t: "Shell", d: "The command interpreter (usually bash). It reads your commands, expands variables and wildcards, and runs programs." },
            { t: "Soft link vs Hard link", d: "A hard link is another name for the same inode, and it survives deleting the original. A soft (symbolic) link is a pointer to a path, and it breaks if the target is removed. Create one with ln -s." }
          ],
          quiz: [
            { q: "What does chmod 750 give the group?", o: ["rwx", "r-x", "r--", "---"], a: 1, e: "7=rwx owner, 5=r-x group, 0=--- others." },
            { q: "You delete the original file. Which link still works?", o: ["Soft link", "Hard link", "Both", "Neither"], a: 1, e: "A hard link points to the same inode, so the data stays while any hard link exists." },
            { q: "Which process is PID 1 on modern RHEL?", o: ["init.d", "GRUB", "systemd", "bash"], a: 2, e: "systemd starts first and brings up all the services." }
          ]
        },
        {
          title: "Basics – files, disks & automation",
          terms: [
            { t: "Filesystem hierarchy", d: "Everything hangs under / (root). /etc = configuration, /var = variable data (logs in /var/log), /home = users' home dirs, /root = root's home, /tmp, /boot, /dev, /proc." },
            { t: "root directory", d: "'/' is the top of the tree. Don't confuse it with /root, which is the root user's home directory." },
            { t: "/etc", d: "System configuration files: /etc/hosts, /etc/resolv.conf, /etc/fstab, /etc/passwd, /etc/sudoers, /etc/nsswitch.conf…" },
            { t: "/var", d: "Data that grows and changes: logs (/var/log/messages), spool, cache. A full /var is a classic production problem." },
            { t: "/home", d: "Users' personal directories (/home/<user>)." },
            { t: "Shell scripts", d: "Text files of commands that start with #!/bin/bash. Make them executable (chmod +x) and use them to automate repetitive work." },
            { t: "crontab", d: "Schedules recurring jobs. Format: minute hour day-of-month month day-of-week command. Example: '0 2 * * * /backup.sh' runs at 02:00 every day. Edit with crontab -e." },
            { t: "mount", d: "Attaches a filesystem (disk, NFS export…) to a directory. Permanent mounts go in /etc/fstab. Example: mount -t nfs server:/vol /mnt." },
            { t: "LVM", d: "Logical Volume Manager. Physical Volumes (disks) → Volume Group (a pool) → Logical Volumes (flexible 'partitions'). You can extend online: pvcreate, vgextend, lvextend -r." }
          ],
          quiz: [
            { q: "Where do system log files usually live?", o: ["/etc", "/var/log", "/home", "/boot"], a: 1, e: "/var/log/messages, /var/log/secure, etc." },
            { q: "What does the crontab line '*/15 * * * * job.sh' do?", o: ["Runs at 15:00", "Runs every 15 minutes", "Runs on the 15th of the month", "Runs 15 times"], a: 1, e: "*/15 in the minute field = every 15 minutes." },
            { q: "Correct LVM order to grow /var with a new disk?", o: ["lvextend → vgextend → pvcreate", "pvcreate → vgextend → lvextend (+ resize fs)", "mkfs → mount → lvcreate", "fdisk → reboot"], a: 1, e: "Make the disk a PV, add it to the VG, extend the LV and grow the filesystem (lvextend -r does both)." }
          ]
        },
        {
          title: "Networking tools",
          terms: [
            { t: "ifconfig", d: "Shows and configures network interfaces (IP, mask, MAC, up/down). The modern replacement is ip addr / ip link." },
            { t: "ethtool", d: "Shows NIC details: link speed, duplex, link detected, driver and errors. Example: ethtool eth0." },
            { t: "tcpdump", d: "Captures packets on an interface. Example: tcpdump -i eth0 host 10.0.0.5 and port 22. Save to a file with -w for Wireshark." },
            { t: "netstat (-noa)", d: "Shows connections and listening ports (-n numeric, -o owner/timers, -a all). On Linux, netstat -tulpn shows listeners with their process. The modern replacement is ss." },
            { t: "nslookup", d: "Queries DNS: nslookup name → IP, nslookup IP → name (PTR). Also try dig." },
            { t: "traceroute / tracert", d: "Lists every router hop to a destination. traceroute on Linux, tracert on Windows." },
            { t: "ftp (bin, hash)", d: "Command-line FTP client. Use 'bin' to switch to binary mode (so files don't get corrupted) and 'hash' to print # progress marks." },
            { t: "telnet", d: "Clear-text remote shell. In practice we use it to test whether a TCP port is open: telnet host 443." },
            { t: "ssh", d: "Encrypted remote shell: ssh user@host. Keys live in ~/.ssh. Copy files with scp." },
            { t: "ping", d: "Sends ICMP echo requests to test reachability and latency. -c 4 sends exactly 4 pings." }
          ],
          quiz: [
            { q: "Which tool shows whether a NIC has a link and at what speed?", o: ["nslookup", "ethtool", "crontab", "ping"], a: 1, e: "ethtool eth0 → Speed, Duplex, Link detected." },
            { q: "Quick way to check if TCP port 443 is open on a server?", o: ["ping host 443", "telnet host 443", "nslookup host 443", "ifconfig 443"], a: 1, e: "telnet (or nc) tries a TCP connection to that port." },
            { q: "You transfer an ISO with ftp and it arrives corrupted. What did you forget?", o: ["hash", "bin", "ls", "cd"], a: 1, e: "ASCII mode corrupts binary files. Switch to 'bin' first." }
          ]
        },
        {
          title: "Commands – files & navigation",
          terms: [
            { t: "touch", d: "Creates an empty file, or updates the timestamp of an existing one." },
            { t: "cd", d: "Changes directory. cd .. goes up, cd ~ goes home, cd - goes back to the previous directory." },
            { t: "ls", d: "Lists files. -l long format, -a include hidden, -h human sizes, -t sort by time." },
            { t: "pwd", d: "Prints the current working directory." },
            { t: "vim", d: "Text editor. i = insert mode, Esc = command mode, :wq = save and quit, :q! = quit without saving, /word = search." },
            { t: "cp", d: "Copies files. -r for directories, -p to preserve permissions and timestamps." },
            { t: "rm", d: "Removes files. -r for directories, -f to force. There's no recycle bin, so double-check before rm -rf!" },
            { t: "mkdir", d: "Creates a directory. -p creates parent directories as needed." },
            { t: "mv", d: "Moves or renames files and directories." },
            { t: "ln", d: "Creates links. ln -s target linkname creates a soft link. Without -s you get a hard link." },
            { t: "find", d: "Searches for files: find /var -name '*.log' -size +100M -mtime +7." },
            { t: "chmod", d: "Changes permissions: chmod 644 file, or chmod u+x script.sh." },
            { t: "chown", d: "Changes owner/group: chown user:group file (-R for recursive)." },
            { t: "df", d: "Shows free disk space per filesystem. -h = human readable, -i = inodes." }
          ],
          quiz: [
            { q: "Which command creates /a/b/c in one go, even if /a doesn't exist?", o: ["mkdir /a/b/c", "mkdir -p /a/b/c", "touch /a/b/c", "cd /a/b/c"], a: 1, e: "-p creates any missing parent directories." },
            { q: "In vim, how do you save and quit?", o: [":q!", ":wq", "Ctrl+S", "exit"], a: 1, e: ":wq = write and quit. :q! quits without saving." },
            { q: "Which command shows free space on every filesystem in GB/MB?", o: ["du", "df -h", "free", "ls -h"], a: 1, e: "df -h. (free shows RAM; du shows how much space a directory uses.)" }
          ]
        },
        {
          title: "Commands – text, processes & more",
          terms: [
            { t: "cat", d: "Prints a file's contents (it can also concatenate files)." },
            { t: "echo", d: "Prints text or variables: echo $PATH. Redirect with > (overwrite) or >> (append)." },
            { t: "more / less", d: "Page through long output. less lets you scroll backward and search (/word). Press q to quit." },
            { t: "head / tail", d: "Show the first or last N lines (-n 20). tail -f follows a growing log live." },
            { t: "grep", d: "Searches text for a pattern: grep -i error /var/log/messages. -v inverts the match, -r searches recursively." },
            { t: "| (pipe)", d: "Sends one command's output into the next command's input: ps -ef | grep java." },
            { t: "sort / join / split", d: "sort orders lines (-n numeric, -r reverse). join merges two sorted files on a common field. split cuts a big file into pieces." },
            { t: "ps", d: "Lists processes. ps -ef or ps aux shows every process, with its PID and owner." },
            { t: "top", d: "Live view of CPU, memory, load average and the busiest processes. Press q to quit." },
            { t: "su / sudo", d: "su switches user (su - = login as root). sudo runs a single command as root, if /etc/sudoers allows it. It's audited and safer." },
            { t: "alias", d: "Creates a shortcut: alias ll='ls -l'. The team uses aliases to jump to systems quickly." },
            { t: "history", d: "Shows previously run commands. !123 re-runs command number 123, and Ctrl+R searches." },
            { t: "man / whatis", d: "man shows a command's full manual. whatis shows a one-line description." },
            { t: "which", d: "Shows the full path of the binary that will run: which python." },
            { t: "env", d: "Prints the environment variables (PATH, HOME, USER…)." }
          ],
          quiz: [
            { q: "Watch a log file live as new lines arrive:", o: ["head -f", "tail -f", "cat -f", "less -n"], a: 1, e: "tail -f follows the file." },
            { q: "Show only processes that contain 'httpd':", o: ["ps -ef | grep httpd", "grep ps httpd", "top httpd", "find httpd"], a: 0, e: "Pipe ps output into grep." },
            { q: "Run one command as root without logging in as root:", o: ["su", "sudo <command>", "chmod 777", "alias root"], a: 1, e: "sudo runs a single command with elevated rights, and it's logged." }
          ]
        }
      ],
      activities: [
        {
          type: "terminal", title: "Terminal Challenge", desc: "Type the command that does the job. Press Enter to submit.", prompt: "[trainee@lab ~]$",
          tasks: [
            { task: "Print the directory you're in", answers: ["pwd"] },
            { task: "List ALL files (including hidden) in long format", answers: ["ls -la", "ls -al", "ls -l -a", "ls -a -l", "ll -a"] },
            { task: "Create a directory called lab", answers: ["mkdir lab"] },
            { task: "Show the last 20 lines of /var/log/messages", answers: ["tail -20 /var/log/messages", "tail -n 20 /var/log/messages", "tail -n20 /var/log/messages"] },
            { task: "Find lines containing error in app.log", answers: ["grep error app.log", "grep 'error' app.log", "grep \"error\" app.log"] },
            { task: "Make script.sh executable for its owner", answers: ["chmod u+x script.sh", "chmod +x script.sh"] },
            { task: "Show free disk space, human readable", answers: ["df -h"] },
            { task: "Create a soft link named latest that points to /data/v2", answers: ["ln -s /data/v2 latest"] },
            { task: "List every running process", answers: ["ps -ef", "ps aux", "ps -aux", "ps -e"] },
            { task: "Find out which IP the name db01 resolves to", answers: ["nslookup db01", "dig db01", "host db01", "getent hosts db01"] }
          ]
        },
        {
          "type": "chmod",
          "title": "Permission Painter",
          "desc": "Turn rwx into numbers and numbers into rwx. Win 6 rounds.",
          "rounds": 6
        },
        {
          "type": "fill",
          "title": "Fill the Gap",
          "desc": "Type the missing word and press Enter.",
          "items": [
            {
              "q": "The DNS servers a Linux host uses are listed in /etc/___",
              "a": [
                "resolv.conf"
              ]
            },
            {
              "q": "In crontab, '0 2 * * *' runs every day at ___:00",
              "a": [
                "2",
                "02"
              ]
            },
            {
              "q": "Permanent mounts are listed in /etc/___",
              "a": [
                "fstab"
              ]
            },
            {
              "q": "On RHEL, PID 1 is ___",
              "a": [
                "systemd"
              ]
            },
            {
              "q": "In LVM, a Logical Volume is carved from a Volume ___",
              "a": [
                "group"
              ]
            },
            {
              "q": "Grow an LV and its filesystem in one go: lvextend ___ -L +5G /dev/vg/var",
              "a": [
                "-r",
                "--resizefs"
              ]
            },
            {
              "q": "Users and their UIDs are listed in /etc/___",
              "a": [
                "passwd"
              ]
            },
            {
              "q": "Who may run sudo is defined in /etc/___",
              "a": [
                "sudoers"
              ]
            }
          ]
        },
        {
          "type": "match",
          "title": "Directory Match",
          "desc": "Click a directory, then click what lives there.",
          "pairs": [
            [
              "/etc",
              "Configuration files"
            ],
            [
              "/var/log",
              "Log files"
            ],
            [
              "/home",
              "Users' home directories"
            ],
            [
              "/root",
              "The root user's home"
            ],
            [
              "/boot",
              "Kernel & bootloader"
            ],
            [
              "/tmp",
              "Temporary files"
            ],
            [
              "/dev",
              "Device files (disks, terminals)"
            ],
            [
              "/proc",
              "Live kernel & process info"
            ]
          ]
        },
        {
          "type": "connections",
          "title": "Shell Connections",
          "desc": "Find 4 groups of 4. Select four tiles and hit Submit. 4 mistakes allowed!",
          "groups": [
            {
              "name": "Text tools",
              "items": [
                "GREP",
                "HEAD",
                "TAIL",
                "SORT"
              ]
            },
            {
              "name": "Permissions & identity",
              "items": [
                "CHMOD",
                "CHOWN",
                "SUDO",
                "SU"
              ]
            },
            {
              "name": "Directories under /",
              "items": [
                "/ETC",
                "/VAR",
                "/HOME",
                "/BOOT"
              ]
            },
            {
              "name": "LVM building blocks",
              "items": [
                "PV",
                "VG",
                "LV",
                "LVEXTEND"
              ]
            }
          ]
        },
        {
          "type": "wordguess",
          "title": "Shell Word Guess",
          "desc": "Guess the Linux word in 6 tries.",
          "words": [
            {
              "w": "CHMOD",
              "hint": "Changes permissions"
            },
            {
              "w": "MOUNT",
              "hint": "Attaches a filesystem to a directory"
            },
            {
              "w": "INODE",
              "hint": "Stores a file's metadata"
            },
            {
              "w": "SHELL",
              "hint": "The command interpreter"
            },
            {
              "w": "CRONTAB",
              "hint": "Schedules recurring jobs"
            },
            {
              "w": "SYSTEMD",
              "hint": "PID 1"
            }
          ]
        },
        {
          "type": "pinpoint",
          "title": "Pinpoint",
          "desc": "Guess the term from as few clues as you can!",
          "puzzles": [
            {
              "clues": [
                "Recurring",
                "-e to edit",
                "* * * * *",
                "minute hour day",
                "Scheduler"
              ],
              "answers": [
                "crontab",
                "cron"
              ],
              "reveal": "crontab schedules recurring jobs."
            },
            {
              "clues": [
                "Extend online",
                "Pool",
                "Physical volume",
                "Volume group",
                "Logical volume"
              ],
              "answers": [
                "lvm",
                "logical volume manager"
              ],
              "reveal": "LVM: PV → VG → LV."
            }
          ]
        },
        {
          "type": "blitz",
          "title": "Term Blitz",
          "desc": "60 seconds! Read the definition and hit the matching term. Score 10 to win.",
          "target": 10
        }
      ],
      labs: [
        {
          title: "Linux team lab", he: "מעבדת לינוקס", kind: "internal",
          desc: "Do these on a lab VM. Write down your answers: your mentor will go over them with you.",
          steps: [
            "Create a user and give it full sudo permissions.",
            "What does the file `/etc/resolv.conf` contain?",
            "What does the `hosts` file do?",
            "What's inside `nsswitch.conf`?",
            "Where are the yum settings? What is yum?",
            "What is LVM?",
            "Add a disk to the VM and grow `/var` by 5 GB."
          ]
        },
        { title: "Linux Survival", kind: "external", url: "https://linuxsurvival.com/", desc: "Super-friendly interactive tutorial with a fake terminal right in the browser. Perfect first stop." },
        { title: "Linux Journey", kind: "external", url: "https://linuxjourney.com/", desc: "Short lessons with quizzes: command line, filesystem, permissions, processes, networking." },
        { title: "OverTheWire: Bandit", kind: "external", url: "https://overthewire.org/wargames/bandit/", desc: "A game you play over real SSH. Each level teaches a command-line skill. Very addictive." },
        { title: "Killercoda Ubuntu playground", kind: "external", url: "https://killercoda.com/playgrounds/scenario/ubuntu", desc: "A free, real Linux VM in your browser for an hour. Break things without fear." },
        { title: "Red Hat interactive labs", kind: "external", url: "https://www.redhat.com/en/interactive-labs", desc: "Free RHEL labs in the browser. Practice yum/dnf, LVM, users and services on real RHEL." }
      ],
      test: { url: "", questions: [] }
    },
    {
      id: "windows", num: 4, title: "Windows", he: "ווינדוס", duration: "2 weeks", mode: "Theory + Lab",
      icon: "🪟", color: "#5CB1D6",
      intro: "Windows servers run AD, DNS, file services and lots of management tools. Learn the essential consoles and commands, the core server roles, and the enterprise systems that run on them.",
      sections: [
        {
          title: "Basics – CMD & system",
          terms: [
            { t: "CMD basic commands", d: "dir (list), mkdir/md (make dir), cd (change dir), rd (remove dir), copy, del, type (print a file), findstr (grep for Windows)." },
            { t: "bat", d: "A batch file (.bat/.cmd): a script of CMD commands you run by double-clicking or calling it." },
            { t: "runas", d: "Runs a program as a different user: runas /user:DOMAIN\\admin cmd. Learn the command and its uses." },
            { t: "hostname", d: "Command that prints the computer's name." },
            { t: "Task Manager", d: "Processes, performance (CPU/RAM/disk/network), services and startup apps. Shortcut: Ctrl+Shift+Esc." },
            { t: "NTFS", d: "The Windows filesystem. Supports permissions (ACLs), journaling, compression, encryption and quotas, plus large files and volumes." },
            { t: "pagefile", d: "pagefile.sys is disk space used as virtual memory when RAM runs out. Heavy paging = slow server." },
            { t: "CPU, RAM", d: "The processor runs instructions (cores/threads). RAM is fast working memory. Check them in Task Manager or Resource Monitor when a server is slow." },
            { t: "PowerShell", d: "An object-based shell and scripting language for automating Windows. Examples: Get-Service, Get-Process, Get-EventLog, Get-ADUser." }
          ],
          quiz: [
            { q: "Windows equivalent of Linux grep:", o: ["type", "findstr", "dir", "copy"], a: 1, e: "findstr searches text in files and output." },
            { q: "Shortcut that opens Task Manager directly:", o: ["Ctrl+Alt+T", "Ctrl+Shift+Esc", "Win+R", "Alt+F4"], a: 1, e: "Ctrl+Shift+Esc." },
            { q: "Which filesystem supports Windows permissions (ACLs)?", o: ["FAT32", "NTFS", "exFAT", "ISO9660"], a: 1, e: "NTFS supports ACLs. FAT32 has no permissions." }
          ]
        },
        {
          title: "Basics – management consoles (via Run)",
          terms: [
            { t: "services.msc", d: "Services console: start/stop services and set their startup type (Automatic/Manual/Disabled) and the account they run as." },
            { t: "eventvwr", d: "Event Viewer: System, Application and Security logs. The first place to look when something fails." },
            { t: "mmc", d: "Microsoft Management Console: a container you add snap-ins to (certificates, AD, DNS…) to build your own console." },
            { t: "regedit", d: "Registry Editor: the hierarchical database of Windows and application settings. Be careful, because mistakes can break the OS." },
            { t: "mstsc", d: "Remote Desktop client (RDP, TCP 3389). mstsc /admin connects to the console session." },
            { t: "taskschd.msc", d: "Task Scheduler: runs scripts and programs on a schedule or trigger. The Windows version of cron." },
            { t: "diskmgmt.msc", d: "Disk Management: bring disks online, initialize them, create, extend or shrink volumes and assign drive letters." }
          ],
          quiz: [
            { q: "A service crashed overnight. Where do you look first?", o: ["regedit", "eventvwr", "mstsc", "diskmgmt.msc"], a: 1, e: "Event Viewer → System/Application logs." },
            { q: "A new LUN was presented to a Windows server. Where do you bring it online and create a volume?", o: ["services.msc", "diskmgmt.msc", "taskschd.msc", "eventvwr"], a: 1, e: "Disk Management: Online → Initialize → New Simple Volume." },
            { q: "Windows' equivalent of crontab:", o: ["taskschd.msc", "services.msc", "mmc", "regedit"], a: 0, e: "Task Scheduler." }
          ]
        },
        {
          title: "Networking commands (CMD)",
          terms: [
            { t: "ping", d: "Tests reachability with ICMP echo. ping -t pings forever; -n sets the number of pings." },
            { t: "ipconfig", d: "Shows IP settings. /all = full details (MAC, DHCP, DNS), /release & /renew = DHCP, /flushdns = clear the DNS cache." },
            { t: "traceroute (tracert)", d: "Shows every hop on the way to a destination: tracert 8.8.8.8." },
            { t: "arp", d: "arp -a shows the ARP cache (IP → MAC). arp -d clears it." },
            { t: "getmac", d: "Lists the MAC addresses of all network adapters." },
            { t: "netstat", d: "Shows connections and listening ports. netstat -ano includes the PID of each connection." },
            { t: "route", d: "route print shows the routing table. route add adds a static route (-p makes it persistent)." },
            { t: "nslookup", d: "Queries DNS servers: nslookup server01, or nslookup server01 10.0.0.53 to ask a specific server." },
            { t: "telnet", d: "Tests whether a TCP port is reachable (telnet host 445). You may need to enable the Telnet Client feature first." },
            { t: "putty", d: "A free SSH/Telnet client for Windows, used to reach Linux, network gear and storage CLIs." },
            { t: "ftp", d: "The built-in command-line FTP client." },
            { t: "scp", d: "Secure copy over SSH. It's built into modern Windows (OpenSSH client): scp file user@host:/tmp." }
          ],
          quiz: [
            { q: "Which command shows the MAC, DHCP server and DNS servers of every adapter?", o: ["ipconfig", "ipconfig /all", "getmac", "route print"], a: 1, e: "ipconfig /all prints full details." },
            { q: "Find which process (PID) is listening on port 443:", o: ["netstat -ano", "arp -a", "tracert", "hostname"], a: 0, e: "-o adds the PID column." },
            { q: "A name resolves to an old IP on your PC only. Which command helps?", o: ["ipconfig /flushdns", "route print", "getmac", "arp -s"], a: 0, e: "Clear the local DNS cache." }
          ]
        },
        {
          title: "Server services",
          terms: [
            { t: "Domain Controller", d: "A server that runs Active Directory Domain Services. It authenticates users and computers (Kerberos) and replicates the AD database to other DCs." },
            { t: "Active Directory", d: "Microsoft's directory service: users, groups, computers and OUs in a domain/forest. It provides central login, permissions and policies." },
            { t: "dsa.msc", d: "The 'Active Directory Users and Computers' console. Create users, reset passwords and manage groups and OUs." },
            { t: "GPO", d: "Group Policy Object: settings (security, scripts, software, registry) linked to sites, domains or OUs and applied automatically. Force an update with gpupdate /force." },
            { t: "IIS", d: "Internet Information Services: Microsoft's web server (HTTP/HTTPS, FTP)." },
            { t: "FTP (server role)", d: "IIS can also host an FTP site for file transfers." },
            { t: "DNS Services + dnsmgmt", d: "The Windows DNS Server role, usually AD-integrated on the DCs. Manage zones and records in dnsmgmt.msc." }
          ],
          quiz: [
            { q: "Which console do you use to reset a user's AD password?", o: ["dsa.msc", "dnsmgmt.msc", "services.msc", "regedit"], a: 0, e: "Active Directory Users and Computers = dsa.msc." },
            { q: "You want a security setting applied to all servers in an OU. Use…", o: ["A GPO", "A bat file on each server", "IIS", "DHCP"], a: 0, e: "Link a GPO to the OU." },
            { q: "Which service authenticates domain logins?", o: ["IIS", "Domain Controller", "SharePoint", "DFSR"], a: 1, e: "DCs authenticate using Kerberos." }
          ]
        },
        {
          title: "Additional systems (know the basics)",
          terms: [
            { t: "Exchange (incl. DAG)", d: "Microsoft's mail server. A DAG (Database Availability Group) keeps copies of mailbox databases on several servers for high availability." },
            { t: "SharePoint", d: "A Microsoft collaboration platform: sites, document libraries and intranet portals. It's backed by SQL Server." },
            { t: "SCCM", d: "System Center Configuration Manager (now MECM): deploys software, patches and OS images to Windows machines at scale." },
            { t: "DFSR", d: "DFS Replication: replicates folders between servers (for example SYSVOL between DCs, or file shares between sites)." }
          ],
          quiz: [
            { q: "What keeps Exchange mailbox databases highly available?", o: ["DFSR", "DAG", "GPO", "IIS"], a: 1, e: "A Database Availability Group." },
            { q: "Which system pushes patches and software to thousands of PCs?", o: ["SCCM", "SharePoint", "DFSR", "mstsc"], a: 0, e: "SCCM/MECM." }
          ]
        }
      ],
      activities: [
        {
          type: "terminal", title: "CMD Challenge", desc: "Type the Windows command (or Run shortcut) that does the job.", prompt: "C:\\Users\\trainee>",
          tasks: [
            { task: "Show full IP configuration of all adapters", answers: ["ipconfig /all"] },
            { task: "Clear the local DNS cache", answers: ["ipconfig /flushdns"] },
            { task: "Print this computer's name", answers: ["hostname"] },
            { task: "Show the routing table", answers: ["route print", "netstat -r"] },
            { task: "Show all connections and listening ports with PIDs", answers: ["netstat -ano", "netstat -aon", "netstat -noa", "netstat -nao", "netstat -oan", "netstat -ona"] },
            { task: "Trace the route to 8.8.8.8", answers: ["tracert 8.8.8.8"] },
            { task: "Open the Remote Desktop client", answers: ["mstsc", "mstsc.exe"] },
            { task: "Open the Services console", answers: ["services.msc"] },
            { task: "Open Active Directory Users and Computers", answers: ["dsa.msc"] }
          ]
        },
        {
          "type": "match",
          "title": "Console Match",
          "desc": "Click a console, then click what it's for.",
          "pairs": [
            [
              "services.msc",
              "Start/stop services"
            ],
            [
              "eventvwr",
              "Read system & app logs"
            ],
            [
              "diskmgmt.msc",
              "Bring disks online, create volumes"
            ],
            [
              "dsa.msc",
              "Manage AD users & groups"
            ],
            [
              "taskschd.msc",
              "Schedule recurring jobs"
            ],
            [
              "mstsc",
              "Remote Desktop client"
            ],
            [
              "regedit",
              "Edit the registry"
            ],
            [
              "dnsmgmt.msc",
              "Manage DNS zones & records"
            ]
          ]
        },
        {
          "type": "truefalse",
          "title": "Windows Myths",
          "desc": "True or false? 3 lives ❤️❤️❤️.",
          "items": [
            {
              "s": "Ctrl+Shift+Esc opens Task Manager directly.",
              "ok": true,
              "e": "No need to go through Ctrl+Alt+Del."
            },
            {
              "s": "FAT32 supports NTFS-style permissions.",
              "ok": false,
              "e": "Only NTFS has ACLs."
            },
            {
              "s": "A GPO can be linked to an OU.",
              "ok": true,
              "e": "GPOs link to sites, domains and OUs."
            },
            {
              "s": "ipconfig /flushdns clears the local DNS cache.",
              "ok": true,
              "e": "Handy when a name resolves to an old IP."
            },
            {
              "s": "RDP uses TCP port 22.",
              "ok": false,
              "e": "RDP = 3389. 22 is SSH."
            },
            {
              "s": "Domain Controllers authenticate domain logins with Kerberos.",
              "ok": true,
              "e": "And Kerberos needs synced clocks (NTP)!"
            },
            {
              "s": "Heavy pagefile use means the server has plenty of RAM.",
              "ok": false,
              "e": "It's the opposite: it's paging because RAM is short."
            }
          ]
        },
        {
          "type": "wordguess",
          "title": "Windows Word Guess",
          "desc": "Guess the Windows word in 6 tries.",
          "words": [
            {
              "w": "REGEDIT",
              "hint": "Edits the registry"
            },
            {
              "w": "DOMAIN",
              "hint": "What a DC controls"
            },
            {
              "w": "NTFS",
              "hint": "The filesystem with ACLs"
            },
            {
              "w": "MSTSC",
              "hint": "Remote Desktop client"
            },
            {
              "w": "BATCH",
              "hint": "A .bat file is a ___ file"
            }
          ]
        },
        {
          "type": "pinpoint",
          "title": "Pinpoint",
          "desc": "Guess the term from as few clues as you can!",
          "puzzles": [
            {
              "clues": [
                "Forest",
                "OU",
                "Kerberos",
                "dsa.msc",
                "Users & computers"
              ],
              "answers": [
                "active directory",
                "ad"
              ],
              "reveal": "Active Directory: Microsoft's directory service."
            },
            {
              "clues": [
                "Linked to an OU",
                "gpupdate",
                "Settings",
                "Applied automatically",
                "Group Policy"
              ],
              "answers": [
                "gpo",
                "group policy object"
              ],
              "reveal": "A GPO pushes settings to users and computers."
            }
          ]
        },
        {
          "type": "blitz",
          "title": "Term Blitz",
          "desc": "60 seconds! Read the definition and hit the matching term. Score 10 to win.",
          "target": 10
        }
      ],
      labs: [
        { title: "Windows team lab", kind: "internal", desc: "Placeholder: your trainer will add the Windows lab tasks here.", steps: [] },
        { title: "Microsoft Learn – Windows Server", kind: "external", url: "https://learn.microsoft.com/en-us/training/browse/?products=windows-server", desc: "Free official modules on AD DS, DNS, Group Policy, file services and more." },
        { title: "Microsoft Learn – Intro to PowerShell", kind: "external", url: "https://learn.microsoft.com/en-us/training/modules/introduction-to-powershell/", desc: "Short interactive intro to PowerShell cmdlets and the pipeline." }
      ],
      test: { url: "", questions: [] }
    },
    {
      id: "storage", num: 5, title: "Basic Storage", he: "אחסון בסיסי", duration: "2 weeks", mode: "Theory",
      icon: "💾", color: "#59C059",
      intro: "The foundation for everything storage: how disks work, block vs file vs object, RAID, SAN and NAS protocols, snapshots, efficiency and backup types. It ends with three playful storage labs: disks and RAID, protocols and real-world processes, and protection and recovery.",
      sections: [
        {
          title: "Disk concepts",
          terms: [
            { t: "Spindle", d: "The motor-driven shaft that spins the platters of a hard disk (HDD). 'Spindles' is also slang for 'number of HDDs': more spindles = more IOPS." },
            { t: "RPM", d: "Revolutions Per Minute: how fast the platters spin (7.2K, 10K, 15K). Higher RPM = lower latency and more IOPS." },
            { t: "Head", d: "The read/write head floats nanometers above the platter on an actuator arm. Moving it (seek time) is the slowest part of HDD access." },
            { t: "Sector", d: "The smallest addressable unit on a disk: traditionally 512 bytes, 4 KB on modern 'Advanced Format' drives." },
            { t: "Track", d: "One concentric ring on a platter surface, made of many sectors." },
            { t: "Cylinder", d: "The same track position across all platters, which the heads can read without moving the arm." }
          ],
          quiz: [
            { q: "Which change gives an HDD more IOPS?", o: ["Lower RPM", "Higher RPM", "Bigger sectors only", "Fewer heads"], a: 1, e: "Faster spinning = less rotational latency." },
            { q: "What's the slowest part of a random read on an HDD?", o: ["Moving the head (seek)", "Sending data over SATA", "CPU", "RAM"], a: 0, e: "Mechanical seek + rotation dominate HDD latency." }
          ]
        },
        {
          title: "Disk types",
          terms: [
            { t: "SSD", d: "Solid State Drive: flash memory with no moving parts. Huge IOPS and very low latency. Wears out after many writes (endurance / DWPD)." },
            { t: "SATA", d: "A consumer/nearline disk interface (6 Gb/s), half-duplex, single port. Cheap, high-capacity 7.2K HDDs." },
            { t: "SAS", d: "Serial Attached SCSI: an enterprise interface (12/24 Gb/s), full-duplex and dual-ported, so two controllers can reach the same disk. Standard in storage arrays." },
            { t: "NVMe", d: "A protocol for flash over PCIe. Far more queues and much lower latency than SAS/SATA. NVMe-oF extends it over the network." }
          ],
          quiz: [
            { q: "Why do storage arrays prefer SAS disks over SATA?", o: ["They're cheaper", "Dual-port and full-duplex for redundancy", "They are always bigger", "They don't need power"], a: 1, e: "Dual ports let both controllers in an HA pair access each disk." },
            { q: "Which runs flash over PCIe with very low latency?", o: ["SATA", "NVMe", "IDE", "FC"], a: 1, e: "NVMe." }
          ]
        },
        {
          title: "Storage architectures & protocols",
          terms: [
            { t: "DAS", d: "Direct Attached Storage: disks inside the server or cabled straight to it. Simple and fast, but not shared." },
            { t: "NAS", d: "Network Attached Storage: shares files over the IP network using NFS (Linux) or SMB/CIFS (Windows). The storage owns the filesystem." },
            { t: "SAN / vSAN", d: "Storage Area Network: a dedicated network (FC or iSCSI) that gives servers block devices (LUNs). VMware vSAN pools local disks of ESXi hosts into shared storage." },
            { t: "Object Storage", d: "Stores data as objects (data + metadata + unique ID) in flat buckets, accessed over HTTP APIs like S3. Scales massively. Great for backups, archives and media." },
            { t: "SCSI", d: "The command set servers use to talk to block devices (read/write blocks). It's carried over SAS, FC (FCP) and iSCSI." }
          ],
          quiz: [
            { q: "A Windows team wants a shared folder over the network. Which architecture?", o: ["DAS", "NAS (SMB)", "SAN (FC)", "Tape"], a: 1, e: "File sharing = NAS. SMB for Windows." },
            { q: "Which architecture gives servers raw block devices (LUNs)?", o: ["NAS", "SAN", "Object", "DNS"], a: 1, e: "A SAN presents LUNs, and the server puts its own filesystem on them." },
            { q: "Which protocol family do iSCSI and FC both carry?", o: ["SMB", "SCSI", "HTTP", "NFS"], a: 1, e: "Both transport SCSI commands." }
          ]
        },
        {
          title: "Storage concepts",
          terms: [
            { t: "Block Storage", d: "Raw blocks with no filesystem. The host formats and owns it (LUNs over FC/iSCSI). Best for databases and VMFS." },
            { t: "File Storage", d: "The storage system owns the filesystem and clients access files and folders (NFS/SMB). Easy sharing between many clients." },
            { t: "RAID 0", d: "Striping with no protection. Fastest, and all capacity is usable, but if one disk dies, all data is lost." },
            { t: "RAID 1", d: "Mirroring: every block is written to 2 disks. 50% usable capacity. Survives one disk failure." },
            { t: "RAID 4", d: "Striping with one dedicated parity disk. Survives 1 failure. NetApp uses it because WAFL avoids the parity-disk bottleneck." },
            { t: "RAID 5", d: "Striping with parity spread across all disks. Usable capacity = N-1 disks. Survives 1 failure. Writes pay a parity penalty." },
            { t: "RAID 6", d: "Like RAID 5 but with two parity blocks. Usable = N-2. Survives 2 simultaneous failures (NetApp's version is RAID-DP)." },
            { t: "RAID 10", d: "A stripe of mirrors (1+0). 50% usable, excellent performance, survives a failure in each mirror pair." },
            { t: "Aggregate", d: "A pool built from RAID groups of physical disks. Volumes are carved out of it (NetApp term)." },
            { t: "Volume", d: "A logical container of data carved from an aggregate/pool. It holds files (NAS) or LUNs (SAN) and has its own snapshots and settings." },
            { t: "Thin / Thick provisioning", d: "Thick reserves all the space up front. Thin uses space only as data is written, so you can overcommit. Monitor thin pools, or they run out of space!" }
          ],
          quiz: [
            { q: "8 disks of 2 TB in RAID 6. Usable capacity?", o: ["16 TB", "14 TB", "12 TB", "8 TB"], a: 2, e: "RAID 6 = N-2 → 6 × 2 TB = 12 TB." },
            { q: "Which RAID level has NO redundancy?", o: ["RAID 0", "RAID 1", "RAID 5", "RAID 10"], a: 0, e: "RAID 0 only stripes." },
            { q: "Thin-provisioned volumes total more than the physical space. Main risk?", o: ["Slower reads", "The pool fills up and writes fail", "Data is mirrored twice", "None"], a: 1, e: "Overcommitment needs monitoring. A full pool means writes fail." }
          ]
        },
        {
          title: "SAN",
          terms: [
            { t: "HBA, WWN", d: "A Host Bus Adapter is the server's FC card. Every FC port and node has a World Wide Name, a 64-bit address similar to a MAC (e.g. 50:0a:09:81:...)." },
            { t: "FC / FCP", d: "Fibre Channel: a lossless, dedicated storage network (8/16/32/64 Gb). FCP is the protocol that carries SCSI over FC." },
            { t: "FCoE", d: "Fibre Channel over Ethernet: FC frames carried inside lossless (DCB) Ethernet, so one converged network does both." },
            { t: "iSCSI", d: "SCSI over TCP/IP (port 3260). Block storage over the normal Ethernet network. Initiator = host, target = storage." },
            { t: "SAN Switch", d: "A Fibre Channel switch (e.g. Brocade, Cisco MDS) that connects hosts to storage and enforces zoning." },
            { t: "LUN", d: "Logical Unit Number: a block device the storage presents to a host. The host sees it as a local disk." },
            { t: "LUN Masking", d: "On the storage side, controls which hosts (initiators) may see which LUNs." },
            { t: "Zoning (Hard, Soft)", d: "On the SAN switch, controls which ports/WWNs can talk to each other. Hard zoning is enforced in switch hardware per port. Soft zoning works through name-server visibility by WWN." },
            { t: "Initiator group", d: "A list of host initiators (WWPNs or iSCSI IQNs) that a LUN is mapped to (an igroup on NetApp)." }
          ],
          quiz: [
            { q: "Which protocol gives block storage over a normal Ethernet/IP network?", o: ["FC", "iSCSI", "NFS", "S3"], a: 1, e: "iSCSI = SCSI over TCP/IP." },
            { q: "Zoning is configured on the ___, LUN masking on the ___.", o: ["host / switch", "SAN switch / storage", "storage / host", "router / DNS"], a: 1, e: "Two layers of access control: fabric (zoning) and array (masking)." },
            { q: "What is the FC equivalent of a MAC address?", o: ["IQN", "WWN", "LUN ID", "VLAN"], a: 1, e: "World Wide Name (WWNN for the node, WWPN for each port)." }
          ]
        },
        {
          title: "NAS",
          terms: [
            { t: "SMB", d: "Server Message Block: the Windows file-sharing protocol (TCP 445). SMB3 adds encryption and multichannel." },
            { t: "CIFS", d: "An old dialect of SMB (SMB1). The name is still widely used for 'Windows shares' (e.g. 'CIFS share' on NetApp)." },
            { t: "NFS (v3 & v4)", d: "Network File System for Linux/Unix and ESXi. v3 is stateless, uses UID/GID-based security and needs auxiliary ports. v4 is stateful, works over a single port (2049), and adds locking and Kerberos/ACLs." }
          ],
          quiz: [
            { q: "Which NFS version is stateful and uses only port 2049?", o: ["NFSv2", "NFSv3", "NFSv4", "SMB1"], a: 2, e: "NFSv4." },
            { q: "SMB uses TCP port…", o: ["22", "445", "2049", "3260"], a: 1, e: "SMB = 445. NFS = 2049. iSCSI = 3260." }
          ]
        },
        {
          title: "Object",
          terms: [
            { t: "S3", d: "Amazon's Simple Storage Service API. It became the industry standard for object storage (PUT/GET/DELETE objects in buckets over HTTPS)." },
            { t: "Swift", d: "OpenStack's object storage API and service, an alternative to S3 (containers instead of buckets)." }
          ],
          quiz: [
            { q: "S3 is accessed over…", o: ["FC", "HTTP(S) API", "SCSI", "SMB"], a: 1, e: "REST calls over HTTP(S)." },
            { q: "Which object API comes from OpenStack?", o: ["S3", "Swift", "NFS", "iSCSI"], a: 1, e: "OpenStack Swift." }
          ]
        },
        {
          title: "Advanced storage concepts",
          terms: [
            { t: "Boot from SAN", d: "The server has no local disk and boots its OS from a LUN on the SAN. Swapping hardware is easy, but it depends on correct zoning and mapping." },
            { t: "Storage tiering", d: "Hot data moves automatically to fast media (SSD) and cold data to cheap media (HDD/cloud)." },
            { t: "Link aggregation", d: "Combines several network links into one logical link (LACP) for bandwidth and redundancy." },
            { t: "NPIV", d: "N_Port ID Virtualization: one physical FC port registers several virtual WWPNs, so each VM or virtual server gets its own identity on the fabric." },
            { t: "MPIO", d: "Multipath I/O: the host uses several paths (HBAs, switches, controllers) to the same LUN for failover and load balancing." },
            { t: "Snapshot (ROW vs COW)", d: "A point-in-time copy. Copy-on-Write copies the old block aside before overwriting it (a write penalty). Redirect-on-Write writes new data to a new place (NetApp WAFL style, no penalty)." },
            { t: "Clone", d: "A writable copy of a volume or LUN. Space-efficient clones share blocks with the source until they change." }
          ],
          quiz: [
            { q: "A host sees the same LUN 4 times. Which software merges the paths?", o: ["NPIV", "MPIO", "Zoning", "Tiering"], a: 1, e: "Multipathing presents one device and balances or fails over between the paths." },
            { q: "Which snapshot method avoids an extra write when data changes?", o: ["Copy-on-Write", "Redirect-on-Write", "Full copy", "Mirror"], a: 1, e: "ROW writes new data elsewhere and keeps the old blocks for the snapshot." }
          ]
        },
        {
          title: "Efficiency",
          terms: [
            { t: "De-duplication (inline/post)", d: "Stores identical blocks only once. Inline dedupes before writing to disk; post-process scans and dedupes later." },
            { t: "Compaction", d: "Packs several small (partially filled) logical blocks into one physical 4 KB block to save space." },
            { t: "Compression", d: "Encodes data so it takes fewer bytes. It costs CPU and saves capacity." }
          ],
          quiz: [
            { q: "100 identical VM images on one volume. Which feature saves the most?", o: ["Compression", "Deduplication", "Compaction", "Tiering"], a: 1, e: "Identical blocks are stored once." },
            { q: "Inline dedup happens…", o: ["After the data is written, on a schedule", "Before the data is written to disk", "Only on tape", "Never on SSD"], a: 1, e: "Inline = in the write path." }
          ]
        },
        {
          title: "Backup types",
          terms: [
            { t: "Dynamic / Hot backup", d: "Taken while the system or application is running and online." },
            { t: "Offline / Cold backup", d: "Taken while the system or application is stopped. It's consistent, but means downtime." },
            { t: "Full", d: "A complete copy of all the data. The slowest to take and the simplest to restore." },
            { t: "Incremental backup", d: "Backs up only what changed since the LAST backup of any type. Fast and small, but a restore needs the full plus EVERY incremental since." },
            { t: "Differential backup", d: "Backs up what changed since the last FULL. It grows every day, but a restore needs only the full plus the latest differential." },
            { t: "Synthetic full", d: "A full built on the backup server by merging the last full with later incrementals, without reading the client again." },
            { t: "FlexClone", d: "NetApp's instant, space-efficient writable clone of a volume, based on a snapshot." },
            { t: "Storage replication", d: "Copies data to another storage system or site (sync or async) for disaster recovery. On NetApp: SnapMirror." }
          ],
          quiz: [
            { q: "Full on Sunday + daily INCREMENTALS. Crash Thursday morning. What do you restore?", o: ["Sunday full only", "Sunday full + Wednesday incremental", "Sunday full + Mon + Tue + Wed incrementals", "Wednesday only"], a: 2, e: "Incrementals chain: you need every one since the full." },
            { q: "Full on Sunday + daily DIFFERENTIALS. Crash Thursday morning. What do you restore?", o: ["Sunday full + Wednesday differential", "All differentials", "Wednesday only", "Sunday only"], a: 0, e: "Each differential holds everything since the full." }
          ]
        }
      ],
      activities: [
        {
          "type": "truefalse",
          "title": "Storage Myths",
          "desc": "True or false? 3 lives ❤️❤️❤️.",
          "items": [
            {
              "s": "RAID is a backup.",
              "ok": false,
              "e": "RAID protects against disk failure, not against deletion, corruption or losing the whole array."
            },
            {
              "s": "RAID 5 survives two simultaneous disk failures.",
              "ok": false,
              "e": "One failure only. You need RAID 6 / RAID-DP for two."
            },
            {
              "s": "A snapshot on the same array protects you if the whole array is lost.",
              "ok": false,
              "e": "Snapshots live on the same disks. Replicate or back up elsewhere."
            },
            {
              "s": "Thin provisioning lets you promise more space than you physically have.",
              "ok": true,
              "e": "That's overcommitment, so monitor the pool!"
            },
            {
              "s": "iSCSI carries SCSI commands over TCP/IP.",
              "ok": true,
              "e": "Port 3260."
            },
            {
              "s": "NFSv4 only needs port 2049.",
              "ok": true,
              "e": "v3 needs extra helper ports."
            },
            {
              "s": "A differential backup holds the changes since the last backup of any type.",
              "ok": false,
              "e": "That's incremental. Differential = changes since the last FULL."
            },
            {
              "s": "SAS disks are dual-ported.",
              "ok": true,
              "e": "So both controllers of an HA pair can reach them."
            }
          ]
        },
        {
          "type": "connections",
          "title": "Storage Connections",
          "desc": "Find 4 groups of 4. Select four tiles and hit Submit. 4 mistakes allowed!",
          "groups": [
            {
              "name": "Block protocols",
              "items": [
                "ISCSI",
                "FC",
                "FCOE",
                "NVME-OF"
              ]
            },
            {
              "name": "File (NAS) words",
              "items": [
                "NFS",
                "SMB",
                "CIFS",
                "EXPORT"
              ]
            },
            {
              "name": "Object words",
              "items": [
                "S3",
                "SWIFT",
                "BUCKET",
                "METADATA"
              ]
            },
            {
              "name": "Inside a hard disk",
              "items": [
                "SPINDLE",
                "HEAD",
                "SECTOR",
                "TRACK"
              ]
            }
          ]
        },
        {
          "type": "wordguess",
          "title": "Storage Word Guess",
          "desc": "Guess the storage word in 6 tries.",
          "words": [
            {
              "w": "PARITY",
              "hint": "Extra data that rebuilds a lost disk"
            },
            {
              "w": "MIRROR",
              "hint": "RAID 1 keeps one"
            },
            {
              "w": "SECTOR",
              "hint": "The smallest unit on a disk"
            },
            {
              "w": "VOLUME",
              "hint": "A logical container of data"
            },
            {
              "w": "BACKUP",
              "hint": "RAID is NOT one"
            },
            {
              "w": "CLONE",
              "hint": "A writable copy"
            }
          ]
        },
        {
          "type": "pinpoint",
          "title": "Pinpoint",
          "desc": "Guess the term from as few clues as you can!",
          "puzzles": [
            {
              "clues": [
                "Stripe",
                "Parity",
                "Spread across all disks",
                "N − 1",
                "Survives one failure"
              ],
              "answers": [
                "raid 5",
                "raid5",
                "raid-5"
              ],
              "reveal": "RAID 5: distributed parity, N−1 usable."
            },
            {
              "clues": [
                "Backup type",
                "Grows every day",
                "Since the last FULL",
                "Full + latest one",
                "Not incremental"
              ],
              "answers": [
                "differential",
                "differential backup"
              ],
              "reveal": "A differential holds every change since the last full."
            }
          ]
        },
        {
          "type": "blitz",
          "title": "Term Blitz",
          "desc": "60 seconds! Read the definition and hit the matching term. Score 10 to win.",
          "target": 10
        }
      ],
      labs: [
        {
          title: "Storage Playground 1 – Disks & RAID", he: "מעבדה – אחסון בסיסי: דיסקים ו-RAID", kind: "interactive",
          desc: "Warm up with how disks work, choose the right disk for the job, then build RAID arrays and try to break them.",
          activities: [
            {
              type: "sort", title: "Mission 1 – Disk anatomy", desc: "Is it a mechanical part, part of the layout on the platter, or a performance measure?",
              buckets: ["Mechanical part", "Layout on the platter", "Performance measure"],
              items: [
                { text: "Spindle", b: 0 }, { text: "Read/write head", b: 0 }, { text: "Actuator arm", b: 0 },
                { text: "Sector", b: 1 }, { text: "Track", b: 1 }, { text: "Cylinder", b: 1 },
                { text: "RPM", b: 2 }, { text: "Seek time", b: 2 }, { text: "IOPS", b: 2 }
              ]
            },
            {
              type: "sort", title: "Mission 2 – Pick the right disk", desc: "Match each description to the disk type it fits.",
              buckets: ["SATA", "SAS", "SSD / NVMe"],
              items: [
                { text: "Cheap and big, for archives", b: 0 }, { text: "Half-duplex, single port", b: 0 }, { text: "7.2K nearline HDD", b: 0 },
                { text: "Dual-ported for two HA controllers", b: 1 }, { text: "Full-duplex 12/24 Gb/s", b: 1 }, { text: "10K/15K enterprise HDD", b: 1 },
                { text: "No moving parts", b: 2 }, { text: "Flash over PCIe", b: 2 }, { text: "Wears out after many writes", b: 2 }
              ]
            },
            {
              type: "raid", title: "Mission 3 – RAID Builder", desc: "Every disk is 2 TB. Choose a RAID level and number of disks to meet each requirement. Click a disk to 'kill' it and test the array!",
              diskTB: 2,
              challenges: [
                { goal: "Maximum speed and capacity, no protection needed. Use exactly 4 disks.", level: "0", disks: 4 },
                { goal: "Mirror the server's boot disk: two identical copies.", level: "1", disks: 2 },
                { goal: "Survive any ONE disk failure with at least 8 TB usable, using the fewest disks.", level: "5", disks: 5 },
                { goal: "Survive any TWO simultaneous failures with at least 8 TB usable, using the fewest disks.", level: "6", disks: 6 },
                { goal: "A busy database: mirrored AND striped, using 4 disks.", level: "10", disks: 4 },
                { goal: "Mirrored AND striped again, but now with at least 6 TB usable, using the fewest disks.", level: "10", disks: 6 }
              ]
            },
            {
              type: "pick", title: "Mission 4 – Which arrays survive?", desc: "Two disks fail at the SAME time. Pick every array that still serves data.",
              items: [
                { text: "RAID 6 with 8 disks", ok: true }, { text: "RAID 5 with 8 disks", ok: false }, { text: "RAID 0 with 2 disks", ok: false },
                { text: "RAID 1 with 3 disks (3-way mirror)", ok: true }, { text: "NetApp RAID-DP group", ok: true }, { text: "NetApp RAID-TEC group", ok: true },
                { text: "RAID 4 with 6 disks", ok: false }
              ]
            }
          ]
        },
        {
          title: "Storage Playground 2 – Protocols & processes", he: "מעבדה – אחסון בסיסי: פרוטוקולים ותהליכים", kind: "interactive",
          desc: "Choose the right architecture, then put real-world processes in order. This is what happens behind the scenes when a server gets its storage.",
          activities: [
            {
              type: "sort", title: "Mission 5 – Architecture matchmaker", desc: "Which storage architecture fits each scenario best?",
              buckets: ["DAS", "NAS", "SAN", "Object"],
              items: [
                { text: "A laptop's internal SSD", b: 0 }, { text: "A single server with local disks, nothing shared", b: 0 },
                { text: "Shared Windows department folder", b: 1 }, { text: "Linux home directories mounted over the network", b: 1 },
                { text: "VMware datastore on FC LUNs", b: 2 }, { text: "Oracle database on raw block devices", b: 2 },
                { text: "Billions of backup files over HTTPS", b: 3 }, { text: "Media archive accessed with the S3 API", b: 3 }
              ]
            },
            {
              type: "sort", title: "Mission 6 – Block, File or Object?", desc: "Sort each protocol or concept into the right kind of storage.",
              buckets: ["Block (SAN)", "File (NAS)", "Object"],
              items: [
                { text: "iSCSI", b: 0 }, { text: "FC / FCP", b: 0 }, { text: "LUN", b: 0 }, { text: "FCoE", b: 0 },
                { text: "NFS", b: 1 }, { text: "SMB / CIFS", b: 1 }, { text: "Share / Export", b: 1 },
                { text: "S3", b: 2 }, { text: "Swift", b: 2 }, { text: "Bucket", b: 2 }
              ]
            },
            {
              type: "order", title: "Mission 7 – Give a server a LUN over FC", desc: "Put the steps in the order they really happen. Click the steps to build the sequence; click a placed step to take it back.",
              steps: [
                "Install an HBA in the server and note its WWPNs",
                "Cable the HBA ports to SAN switch fabric A and fabric B",
                "The HBA logs into the fabric (FLOGI) and appears in the name server",
                "Zone the host WWPN with the storage target ports, then save and enable the config",
                "Create a volume and a LUN on the storage",
                "Create an igroup with the host WWPNs and map the LUN to it",
                "Rescan the disks on the host and check that multipathing (MPIO) sees every path",
                "Format the new disk and start using it"
              ]
            },
            {
              type: "order", title: "Mission 8 – Mount an NFS export on Linux", desc: "Same idea, but over NAS. What happens first?",
              steps: [
                "Create a volume on the storage system",
                "Add an export-policy rule that allows the client's IP (rw)",
                "Give the volume a junction path, e.g. /vol_app",
                "On the Linux client, create a mount point: `mkdir /mnt/app`",
                "Mount it: `mount -t nfs server:/vol_app /mnt/app`",
                "Add it to /etc/fstab so it survives a reboot",
                "Verify with `df -h` and write a test file"
              ]
            },
            {
              type: "pick", title: "Mission 9 – Who controls access?", desc: "A host suddenly can't see its LUN. Pick every place where access to a LUN is controlled.",
              items: [
                { text: "Zoning on the SAN switch", ok: true }, { text: "LUN masking / igroup mapping on the storage", ok: true },
                { text: "The export policy", ok: false }, { text: "SMB share permissions", ok: false }, { text: "The host's DNS server", ok: false },
                { text: "The bucket policy", ok: false }
              ]
            }
          ]
        },
        {
          title: "Storage Playground 3 – Protection & recovery", he: "מעבדה – אחסון בסיסי: הגנה ושחזור", kind: "interactive",
          desc: "Snapshots, efficiency and backups. Then save the day twice when servers crash.",
          activities: [
            {
              type: "sort", title: "Mission 10 – COW or ROW?", desc: "Sort each statement to the snapshot method it describes.",
              buckets: ["Copy-on-Write (COW)", "Redirect-on-Write (ROW)"],
              items: [
                { text: "Copies the old block aside before overwriting", b: 0 }, { text: "Every first write costs an extra read + write", b: 0 }, { text: "Performance drops while snapshots exist", b: 0 },
                { text: "New data is written to a new location", b: 1 }, { text: "NetApp WAFL works this way", b: 1 }, { text: "No extra write penalty", b: 1 }
              ]
            },
            {
              type: "sort", title: "Mission 11 – Save the space", desc: "Which efficiency feature fits each situation?",
              buckets: ["Deduplication", "Compression", "Compaction", "Thin provisioning"],
              items: [
                { text: "100 identical VM images", b: 0 }, { text: "Same attachment stored 1,000 times", b: 0 },
                { text: "Large text logs", b: 1 }, { text: "Encodes data into fewer bytes (costs CPU)", b: 1 },
                { text: "Many tiny 1 KB files, each wasting a 4 KB block", b: 2 },
                { text: "A volume promised 10 TB but only 2 TB written", b: 3 }, { text: "Space is allocated only when data is written", b: 3 }
              ]
            },
            {
              type: "order", title: "Mission 12 – Restore a database from backups", desc: "Full on Sunday, a differential every night, transaction logs every 15 minutes. The DB crashed Thursday at 10:40. Put the restore steps in order.",
              steps: [
                "Tell the owner and stop the application",
                "Restore Sunday's FULL backup",
                "Restore Wednesday night's DIFFERENTIAL",
                "Replay the transaction logs up to 10:30",
                "Bring the database online and verify the data with the owner"
              ]
            },
            {
              type: "pick", title: "Mission 13 – Rescue the server (incrementals)", desc: "Backups: FULL every Sunday night, INCREMENTAL every other night. The disk died on Thursday at 09:00. Pick EXACTLY the backups needed to restore Wednesday night's state.",
              items: [
                { text: "🗓️ Sun – FULL", ok: true }, { text: "🗓️ Mon – incremental", ok: true }, { text: "🗓️ Tue – incremental", ok: true },
                { text: "🗓️ Wed – incremental", ok: true }, { text: "🗓️ Last week's Sat – incremental", ok: false }, { text: "🗓️ Last week's Sun – FULL", ok: false }
              ]
            },
            {
              type: "pick", title: "Mission 14 – Rescue the server (differentials)", desc: "This time: FULL every Sunday night, DIFFERENTIAL every other night. The disk died on Friday at 08:00. Pick EXACTLY the backups needed to restore Thursday night's state.",
              items: [
                { text: "🗓️ Sun – FULL", ok: true }, { text: "🗓️ Mon – differential", ok: false }, { text: "🗓️ Tue – differential", ok: false },
                { text: "🗓️ Wed – differential", ok: false }, { text: "🗓️ Thu – differential", ok: true }, { text: "🗓️ Last week's Sun – FULL", ok: false }
              ]
            }
          ]
        }
      ],
      test: { url: "", questions: [] }
    },
    {
      id: "netapp", num: 6, title: "NetApp Storage", he: "אחסון NetApp", duration: "1 month", mode: "Theory + Lab",
      icon: "🗄️", color: "#0067C5",
      intro: "NetApp ONTAP is the team's main storage platform. Learn the hardware, how disks become aggregates, how SVMs, volumes and LUNs are built on top, how clients reach data over NAS/SAN, and how data is protected and shrunk.",
      sections: [
        {
          title: "Operating system & platforms",
          terms: [
            { t: "CDOT", d: "Clustered Data ONTAP (today just 'ONTAP 9'): NetApp's scale-out OS. Many nodes form one cluster, and data is served by SVMs." },
            { t: "7mode", d: "The legacy ONTAP (7-Mode): standalone controllers or HA pairs with no cluster/SVM concept. You may still meet it in old docs and migrations." },
            { t: "FAS", d: "NetApp's hybrid arrays (HDD + optional flash cache/pool)." },
            { t: "AFF", d: "All Flash FAS: NetApp's all-SSD/NVMe arrays for high performance (A-series)." },
            { t: "C Series", d: "Capacity flash: all-flash arrays built on cheaper QLC SSDs (AFF C-series), for capacity-oriented workloads." },
            { t: "WAFL", d: "Write Anywhere File Layout: ONTAP's filesystem. It never overwrites in place. New data goes to free blocks, which makes snapshots instant and free." },
            { t: "Inode", d: "In WAFL, the metadata structure of each file that points to its data blocks. Snapshots are basically a frozen copy of the root inode." },
            { t: "Service Processor", d: "An out-of-band management controller in each node (like iLO/iDRAC). Console access, power control and sensors even when ONTAP is down." }
          ],
          quiz: [
            { q: "Why are ONTAP snapshots instant and cheap?", o: ["They're compressed", "WAFL never overwrites blocks in place", "They're stored on tape", "They're copies of the whole volume"], a: 1, e: "The snapshot just keeps the old block pointers; nothing is copied." },
            { q: "Which NetApp line is all-flash?", o: ["FAS", "AFF", "7mode", "E-Series HDD"], a: 1, e: "AFF = All Flash FAS." },
            { q: "ONTAP is down and you need the node's console. Use…", o: ["Service Processor", "LIF", "SVM", "Qtree"], a: 0, e: "SP gives out-of-band access." }
          ]
        },
        {
          title: "Physical architecture",
          terms: [
            { t: "Node", d: "A single controller running ONTAP: CPU, RAM, NVRAM and ports." },
            { t: "Cluster", d: "A set of nodes (2-24 for NAS) connected by a dedicated cluster interconnect and managed as one system." },
            { t: "HA", d: "High-Availability pair: two nodes that share access to each other's disks. If one fails, its partner takes over (takeover / giveback)." },
            { t: "NVRAM", d: "Non-volatile RAM that logs incoming writes. A write is acknowledged once it's in NVRAM and mirrored to the HA partner, which makes writes fast and safe." },
            { t: "Consistency Point", d: "A CP is when WAFL flushes the buffered writes from memory to disk as one consistent image, at least every 10 seconds or when NVRAM half-fills." },
            { t: "Modules, ports", d: "Controllers have onboard and PCIe ports: e0a… (Ethernet), 0a… (FC/SAS), cluster ports, HA ports, and e0M for management." }
          ],
          quiz: [
            { q: "When is a client write acknowledged on ONTAP?", o: ["After it reaches disk", "After it's logged in NVRAM (and mirrored to partner)", "After the next snapshot", "After the CP"], a: 1, e: "NVRAM logging makes the ack fast. The CP later writes it to disk." },
            { q: "Node 1 fails. Who serves its data?", o: ["Nobody", "Its HA partner (takeover)", "The SP", "The SVM DR site"], a: 1, e: "The HA partner takes over its disks and LIFs." }
          ]
        },
        {
          title: "Disks & aggregates",
          terms: [
            { t: "Disk Shelf", d: "An enclosure full of disks (e.g. DS224C, NS224) connected to the controllers by SAS or NVMe/Ethernet." },
            { t: "Disk identifier", d: "How ONTAP names a disk: stack.shelf.bay, e.g. 1.10.4 = stack 1, shelf 10, bay 4." },
            { t: "Stack", d: "A chain of shelves cabled together and connected to the controller ports." },
            { t: "Shelf cabling (שרשור מדפים)", d: "Daisy-chaining shelves in a stack with redundant (multipath HA) SAS cabling, so each controller has two paths to every disk." },
            { t: "RAID (4, DP, 0, TEC)", d: "RAID-4 = 1 parity disk. RAID-DP = 2 parity (survives 2 failures, the default). RAID-TEC = 3 parity (for huge disks). RAID-0 = no parity (only on back-end arrays)." },
            { t: "Spare Disk", d: "An unused disk waiting to replace a failed one. ONTAP rebuilds onto it automatically." },
            { t: "Aggregate (root, data, flash pool), plex", d: "A pool of RAID groups. The root aggregate holds the node's root volume, data aggregates hold user volumes, and a flash pool aggregate mixes SSD cache with HDD. A plex is one copy of the aggregate (2 plexes with SyncMirror)." },
            { t: "ADP", d: "Advanced Drive Partitioning: splits each disk into partitions (root + data) so small systems don't waste whole disks on root aggregates." },
            { t: "vol move", d: "Moves a volume between aggregates or nodes online, with no client disruption." },
            { t: "Flash Pool", d: "An aggregate that combines HDD RAID groups with an SSD RAID group used as read/write cache." },
            { t: "Flash Cache", d: "A PCIe flash card in the controller that acts as a read cache for the whole node." },
            { t: "Storage pool", d: "A set of SSDs split into allocation units that can be shared as Flash Pool cache by several aggregates." },
            { t: "Tiering (FabricPool)", d: "Automatically moves cold blocks from a performance aggregate to cheap object storage (StorageGRID / S3)." }
          ],
          quiz: [
            { q: "What does disk ID 2.11.7 mean?", o: ["Node 2, port 11, LUN 7", "Stack 2, shelf 11, bay 7", "Aggregate 2, volume 11, qtree 7", "VLAN 2.11.7"], a: 1, e: "stack.shelf.bay." },
            { q: "Default RAID type for NetApp aggregates?", o: ["RAID-0", "RAID-4", "RAID-DP", "RAID-10"], a: 2, e: "RAID-DP: double parity." },
            { q: "Move a volume to a less busy aggregate with no downtime:", o: ["snapmirror break", "vol move", "vol clone", "aggr mirror"], a: 1, e: "vol move is non-disruptive." }
          ]
        },
        {
          title: "Logical architecture",
          terms: [
            { t: "SVM", d: "Storage Virtual Machine (vserver): a secure virtual storage server inside the cluster, with its own volumes, LIFs, protocols and admins. Clients only ever see SVMs." },
            { t: "root volume", d: "Each SVM has a small root volume: the '/' of its namespace, where other volumes are junctioned." },
            { t: "Volume", d: "A FlexVol: a logical container in an aggregate that holds data, snapshots, quotas and efficiency settings." },
            { t: "LUN", d: "A block device created inside a volume and mapped to hosts over FC or iSCSI." },
            { t: "Qtree", d: "A sub-directory of a volume that can have its own quota, security style and export policy." }
          ],
          quiz: [
            { q: "What do NAS/SAN clients actually connect to on a cluster?", o: ["The node", "An SVM (through its LIFs)", "The aggregate", "The disk shelf"], a: 1, e: "SVMs serve the data. Nodes and aggregates are hidden from clients." },
            { q: "Where does a LUN live?", o: ["Directly in an aggregate", "Inside a volume", "In the SP", "In NVRAM"], a: 1, e: "Aggregate → Volume → LUN." }
          ]
        },
        {
          title: "NAS on ONTAP",
          terms: [
            { t: "NFS export", d: "A volume or qtree made available to NFS clients through its junction path and export policy." },
            { t: "CIFS share", d: "A named SMB share that points to a path in the SVM namespace, with share permissions (ACLs)." },
            { t: "NFS/CIFS server", d: "The protocol server configured on an SVM (vserver nfs create / vserver cifs create). The CIFS server joins Active Directory." },
            { t: "export policy, rule", d: "An export policy holds rules: which clients (IP/subnet/netgroup) get which access (ro/rw/superuser) over which protocol. It's attached to volumes and qtrees." },
            { t: "namespace, junction path", d: "The SVM's single directory tree. Each volume is mounted (junctioned) at a path like /vol_data, so clients see one big tree." },
            { t: "name mapping", d: "Maps Windows users to Unix users (and back), so multiprotocol access gets the right permissions." },
            { t: "security style", d: "Unix, NTFS or mixed. Decides which permission model (mode bits or NTFS ACLs) rules a volume or qtree." }
          ],
          quiz: [
            { q: "An NFS client gets 'access denied' mounting a volume. Check first:", o: ["Export policy rules", "RAID type", "The SP", "Flash cache"], a: 0, e: "The export policy decides which clients may access the volume." },
            { q: "How does a new volume become visible to NAS clients?", o: ["Give it a junction path in the namespace", "Put it in a qtree", "Add a spare disk", "Create a LUN"], a: 0, e: "Mount it in the namespace (junction path)." }
          ]
        },
        {
          title: "SAN on ONTAP",
          terms: [
            { t: "igroup", d: "Initiator group: the list of host WWPNs (FC) or IQNs (iSCSI) plus the OS type. LUNs are mapped to igroups." },
            { t: "lun mapping", d: "Connects a LUN to an igroup with a LUN ID, so those hosts can see it (ONTAP's LUN masking)." }
          ],
          quiz: [
            { q: "A host can't see its new LUN. What's commonly missing?", o: ["The LUN mapping to the host's igroup", "An export policy", "A CIFS share", "A junction path"], a: 0, e: "SAN access = igroup + LUN mapping (plus zoning on the fabric)." },
            { q: "An iSCSI igroup contains…", o: ["WWPNs", "IQNs", "IP routes", "MAC addresses"], a: 1, e: "iSCSI initiators are identified by IQN." }
          ]
        },
        {
          title: "Networking on ONTAP",
          terms: [
            { t: "LIF", d: "Logical InterFace: an IP address (or WWPN) that belongs to an SVM and lives on a port. NAS LIFs can migrate between ports and nodes on failure." },
            { t: "ifgrp", d: "Interface group: bonds physical Ethernet ports into one (LACP/multimode or single-mode) for bandwidth and redundancy." },
            { t: "broadcast domain", d: "A group of ports in the same L2 network. It defines the failover targets a LIF can move to." },
            { t: "routing", d: "Each SVM has its own routing table (default gateway and static routes), used by its LIFs." },
            { t: "ipspace", d: "A separate IP address space with its own routing, for secure multi-tenancy. Overlapping subnets can exist in different ipspaces." },
            { t: "MPIO – FC vs Ethernet", d: "NAS LIFs fail over by migrating. SAN LIFs never migrate: the host's multipathing (MPIO/ALUA) picks another path instead." },
            { t: "NTP", d: "The cluster must have correct time for AD/CIFS authentication, logs and SnapMirror schedules." }
          ],
          quiz: [
            { q: "A node port fails. What happens to a NAS LIF on it?", o: ["It's deleted", "It migrates to another port in its broadcast domain", "The SVM stops", "The host's MPIO handles it"], a: 1, e: "NAS LIFs fail over within the broadcast domain/failover group." },
            { q: "A SAN path fails. Who handles failover?", o: ["The LIF migrates", "The host's MPIO/ALUA", "NTP", "The ipspace"], a: 1, e: "SAN LIFs don't migrate. The host uses another path." }
          ]
        },
        {
          title: "Data protection",
          terms: [
            { t: "snapshot", d: "A read-only point-in-time image of a volume. Instant, and space-efficient thanks to WAFL. Users can restore from .snapshot/~snapshot." },
            { t: "snapshot policy", d: "A schedule plus a retention count, e.g. hourly ×6, daily ×2, weekly ×2. Assigned per volume." },
            { t: "snap reserve", d: "The percentage of a volume set aside for snapshot data, so snapshots don't eat the space users see." },
            { t: "FlexClone", d: "An instant writable copy of a volume, based on a snapshot. It takes no space until changes are made. Great for test/dev." },
            { t: "SnapMirror", d: "Asynchronous (or sync) replication of volumes to another cluster for DR. On a disaster you 'break' the mirror and serve from the destination." },
            { t: "SnapVault", d: "Disk-to-disk backup replication that keeps a longer snapshot history on the secondary than the source has (a vault policy)." },
            { t: "SVM DR", d: "Replicates an entire SVM (volumes + configuration such as LIFs, shares and exports) to another cluster." },
            { t: "SyncMirror", d: "Synchronous mirroring of an aggregate into two plexes, on separate shelves or sites." },
            { t: "MetroCluster", d: "Two clusters at two sites, synchronously mirrored (SyncMirror + NVRAM mirroring), giving zero data loss and site failover." }
          ],
          quiz: [
            { q: "Which feature gives a test team a full writable copy of a 10 TB volume in seconds?", o: ["SnapVault", "FlexClone", "vol move", "SyncMirror"], a: 1, e: "FlexClone shares blocks with the parent snapshot." },
            { q: "Which one replicates a whole SVM including its configuration?", o: ["SVM DR", "Snapshot policy", "Snap reserve", "Qtree"], a: 0, e: "SVM DR." },
            { q: "Zero data loss across two sites with automatic site failover:", o: ["SnapMirror async", "MetroCluster", "SnapVault", "Snapshots"], a: 1, e: "MetroCluster is synchronous." }
          ]
        },
        {
          title: "Data reduction",
          terms: [
            { t: "Deduplication", d: "Removes duplicate 4 KB blocks within a volume (or aggregate on AFF). Inline and/or background." },
            { t: "Compaction", d: "Packs several small data chunks into a single 4 KB physical block. It works after compression." },
            { t: "Compression", d: "Compresses data blocks (inline on AFF) to cut the physical space used." }
          ],
          quiz: [
            { q: "Many small 1 KB files each use a whole 4 KB block. Which feature helps most?", o: ["Compaction", "SnapMirror", "Tiering", "Snapshots"], a: 0, e: "Compaction packs small chunks together." },
            { q: "Dedup works at the level of…", o: ["Files only", "4 KB blocks", "Volumes", "Disks"], a: 1, e: "ONTAP dedup compares 4 KB blocks." }
          ]
        }
      ],
      activities: [
        {
          type: "sort", title: "Physical or Logical?", desc: "Is it hardware you can touch, or a logical object inside ONTAP?",
          buckets: ["Physical", "Logical"],
          items: [
            { text: "Node", b: 0 }, { text: "Disk shelf", b: 0 }, { text: "NVRAM", b: 0 }, { text: "Spare disk", b: 0 }, { text: "Service Processor", b: 0 },
            { text: "SVM", b: 1 }, { text: "Volume", b: 1 }, { text: "Qtree", b: 1 }, { text: "LIF", b: 1 }, { text: "igroup", b: 1 }
          ]
        },
        {
          type: "sort", title: "Build order", desc: "Which layer does each object belong to? (Bottom → top)",
          buckets: ["1 · Disks", "2 · Aggregate", "3 · SVM", "4 · Volume", "5 · Inside a volume"],
          items: [
            { text: "Spare disk", b: 0 }, { text: "RAID group", b: 1 }, { text: "Plex", b: 1 },
            { text: "LIF", b: 2 }, { text: "Export policy", b: 2 }, { text: "Snapshot", b: 3 }, { text: "Junction path", b: 3 },
            { text: "LUN", b: 4 }, { text: "Qtree", b: 4 }
          ]
        },
        {
          "type": "memory",
          "title": "ONTAP Memory",
          "desc": "Match each ONTAP object to what it is.",
          "pairs": [
            [
              "SVM",
              "Virtual storage server"
            ],
            [
              "LIF",
              "IP address that serves data"
            ],
            [
              "igroup",
              "List of host initiators"
            ],
            [
              "Qtree",
              "Sub-directory with its own quota"
            ],
            [
              "NVRAM",
              "Logs writes before disk"
            ],
            [
              "Aggregate",
              "Pool of RAID groups"
            ]
          ]
        },
        {
          "type": "fill",
          "title": "ONTAP Fill the Gap",
          "desc": "Type the missing word and press Enter.",
          "items": [
            {
              "q": "The default RAID type for NetApp aggregates is RAID-___",
              "a": [
                "dp"
              ]
            },
            {
              "q": "Disk 1.10.4 = stack 1, shelf 10, ___ 4",
              "a": [
                "bay"
              ]
            },
            {
              "q": "Move a volume to another aggregate without downtime: vol ___",
              "a": [
                "move"
              ]
            },
            {
              "q": "A volume becomes visible to NAS clients once it has a ___ path",
              "a": [
                "junction"
              ]
            },
            {
              "q": "Replicate volumes to another cluster for DR: Snap___",
              "a": [
                "mirror"
              ]
            },
            {
              "q": "An instant writable copy of a volume: Flex___",
              "a": [
                "clone"
              ]
            },
            {
              "q": "Which hosts may mount an NFS volume is decided by its export ___",
              "a": [
                "policy"
              ]
            }
          ]
        },
        {
          "type": "connections",
          "title": "ONTAP Connections",
          "desc": "Find 4 groups of 4. Select four tiles and hit Submit. 4 mistakes allowed!",
          "groups": [
            {
              "name": "Physical hardware",
              "items": [
                "NODE",
                "SHELF",
                "NVRAM",
                "SPARE DISK"
              ]
            },
            {
              "name": "Logical objects",
              "items": [
                "SVM",
                "VOLUME",
                "QTREE",
                "LUN"
              ]
            },
            {
              "name": "Data protection",
              "items": [
                "SNAPSHOT",
                "SNAPMIRROR",
                "SNAPVAULT",
                "METROCLUSTER"
              ]
            },
            {
              "name": "Data reduction & placement",
              "items": [
                "DEDUP",
                "COMPACTION",
                "COMPRESSION",
                "TIERING"
              ]
            }
          ]
        },
        {
          "type": "wordguess",
          "title": "ONTAP Word Guess",
          "desc": "Guess the NetApp word in 6 tries.",
          "words": [
            {
              "w": "WAFL",
              "hint": "ONTAP's filesystem"
            },
            {
              "w": "QTREE",
              "hint": "Sub-directory with its own quota"
            },
            {
              "w": "IGROUP",
              "hint": "List of host initiators"
            },
            {
              "w": "SHELF",
              "hint": "An enclosure full of disks"
            },
            {
              "w": "PLEX",
              "hint": "One copy of an aggregate"
            }
          ]
        },
        {
          "type": "pinpoint",
          "title": "Pinpoint",
          "desc": "Guess the term from as few clues as you can!",
          "puzzles": [
            {
              "clues": [
                "Multi-tenant",
                "Root volume",
                "Namespace",
                "Owns LIFs",
                "Vserver"
              ],
              "answers": [
                "svm",
                "storage virtual machine",
                "vserver"
              ],
              "reveal": "SVM: a virtual storage server inside the cluster."
            },
            {
              "clues": [
                "Never overwrites",
                "Consistency point",
                "Instant snapshots",
                "Filesystem",
                "Write Anywhere"
              ],
              "answers": [
                "wafl"
              ],
              "reveal": "WAFL: Write Anywhere File Layout."
            }
          ]
        },
        {
          "type": "blitz",
          "title": "Term Blitz",
          "desc": "60 seconds! Read the definition and hit the matching term. Score 10 to win.",
          "target": 10
        }
      ],
      labs: [
        {
          title: "NetApp team lab", he: "מעבדת NetApp", kind: "internal",
          desc: "⚠️ Do NOT change existing configurations or the main machine's settings. Touch only the vservers you create. Follow the team standard for names, addresses and settings, because you'll reuse them in later labs.",
          steps: [
            "Connect to the team's management machine.",
            "Run the `alias` command and connect to the main dev storage system. Ask the team what's on the network and what each alias points to.",
            "On the main dev storage, create an NAS vserver end-to-end. Pick free addresses according to the team standard, and verify they're unused (no ping reply, no nslookup record). Ask a teammate which segment to use.",
            "Create an NFS volume and verify access from another station (use the `check-access` command).",
            "Create a CIFS share and verify you can open it in your workstation's file explorer.",
            "Create a SAN vserver end-to-end. Create a volume and a LUN."
          ]
        },
        { title: "NetApp Lab on Demand", kind: "external", url: "https://labondemand.netapp.com/", desc: "Free hands-on ONTAP labs running real clusters in your browser. Try the 'Getting started with ONTAP', NAS, SAN and SnapMirror labs. (Requires a NetApp account.)" },
        { title: "ONTAP 9 documentation", kind: "external", url: "https://docs.netapp.com/us-en/ontap/", desc: "Official ONTAP docs. Every CLI command and concept from this chapter, explained." }
      ],
      test: { url: "", questions: [] }
    },
    {
      id: "san", num: 7, title: "SAN", he: "SAN", duration: "1 week", mode: "Theory",
      icon: "🔌", color: "#FF8C1A",
      intro: "Go deeper into Fibre Channel fabrics: cables and optics, how ports log into the fabric, zoning, NPIV/NPV, and hands-on concepts on Brocade switches.",
      sections: [
        {
          title: "Physical layer",
          terms: [
            { t: "Cable & connector types", d: "FC runs mostly over multi-mode fiber (OM3/OM4, aqua) with LC connectors. Single-mode fiber (OS2, yellow) is for long distances. Copper DAC is for short links." },
            { t: "SFP", d: "Small Form-factor Pluggable: a hot-swappable optical transceiver in the switch/HBA port. Its speed (16/32G) and type (SW/LW) must match the link." },
            { t: "HBA", d: "Host Bus Adapter: the server's FC card (e.g. QLogic, Emulex). Each port has its own WWPN." },
            { t: "GBIC", d: "Gigabit Interface Converter: the older, larger predecessor of the SFP." }
          ],
          quiz: [
            { q: "A new 32G link won't come up. One side has an 8G SW SFP. The problem?", o: ["Zoning", "SFP speed mismatch / unsupported speed", "Wrong VLAN", "DNS"], a: 1, e: "Optics must support the negotiated speed on both sides." },
            { q: "LC connectors on aqua cable usually mean…", o: ["Single-mode fiber", "Multi-mode fiber (OM3/OM4)", "Cat6 copper", "Coax"], a: 1, e: "Aqua = OM3/OM4 multi-mode." }
          ]
        },
        {
          title: "Concepts",
          terms: [
            { t: "WWNN & WWPN", d: "World Wide Node Name identifies the device (the HBA or storage node). World Wide Port Name identifies each port. Zoning and igroups use WWPNs." },
            { t: "Zoning, Hard/Soft zoning", d: "A zone is a group of members that may talk to each other. Best practice: single-initiator zones (1 host port + its targets). Hard = enforced by switch hardware. Soft = enforced only through name-server visibility." },
            { t: "ISL & NPIV", d: "An ISL (Inter-Switch Link) connects two FC switches (E_Ports) to build one fabric. NPIV lets one physical port log in with many virtual WWPNs." },
            { t: "Aliases", d: "Friendly names for WWPNs (e.g. esx01_hba0), so zones are readable." },
            { t: "VSAN (Cisco)", d: "A virtual SAN: splits one physical Cisco MDS fabric into isolated logical fabrics, like VLANs for FC. Not to be confused with VMware vSAN." },
            { t: "Fabric", d: "One or more interconnected FC switches that share services (name server, zoning). Best practice: two separate fabrics, A and B, for redundancy." },
            { t: "FLOGI & PLOGI", d: "FLOGI (Fabric Login): a port logs into the switch and gets an FC address (FCID). PLOGI (Port Login): an initiator logs into a target port before doing I/O." },
            { t: "NPV Mode", d: "N_Port Virtualization: an edge switch acts like a host (passing logins up to a core switch through NPIV) instead of being a full fabric switch, which keeps the number of domains low." },
            { t: "Access Gateway", d: "Brocade's name for NPV mode: the switch logs its hosts into the core fabric as an NPIV device." }
          ],
          quiz: [
            { q: "Which login happens first when an HBA is cabled to a switch?", o: ["PLOGI", "FLOGI", "PRLI", "iSCSI login"], a: 1, e: "FLOGI to the fabric first, then PLOGI to targets." },
            { q: "Best-practice zoning style:", o: ["One big zone for everything", "Single initiator per zone", "No zoning", "Zone by VLAN"], a: 1, e: "Single-initiator zones limit RSCN noise and blast radius." },
            { q: "Why build two separate fabrics (A and B)?", o: ["More VLANs", "Redundancy: a fabric failure doesn't cut storage access", "Faster DNS", "Licensing"], a: 1, e: "Each host and storage connects to both fabrics, and MPIO uses both." }
          ]
        },
        {
          title: "Brocade",
          terms: [
            { t: "Brocade", d: "A leading FC switch vendor (now Broadcom). Managed by CLI over SSH or through the Web Tools / SANnav GUI." },
            { t: "Connection architecture", d: "Hosts and storage connect to edge/core switches. In core-edge designs, edge switches uplink to directors through ISLs/trunks, with two independent fabrics." },
            { t: "Port types", d: "F_Port = fabric port to a device (host/storage). E_Port = switch-to-switch (ISL). N_Port = the device side. G_Port = generic/unconfigured. EX_Port = routing between fabrics." },
            { t: "SNS", d: "Simple Name Server: the fabric's directory of logged-in devices (WWPN → FCID). Devices query it to find targets (nsshow / nscamshow)." },
            { t: "Configuration commands", d: "switchshow (ports and status), portshow, nsshow, alicreate, zonecreate, cfgadd, cfgsave, cfgenable." },
            { t: "Brocade cabling (שרשור)", d: "Connecting switches with ISLs (or ISL trunks) to merge them into one fabric." },
            { t: "Creating zones & aliases", d: "alicreate \"esx01_hba0\",\"10:00:...\" → zonecreate \"z_esx01_netapp\",\"esx01_hba0;netapp_0a\" → cfgadd \"cfg\",\"z_esx01_netapp\" → cfgsave → cfgenable \"cfg\"." },
            { t: "Configuration file", d: "The zoning configuration (cfg) holds all the zones. Only one cfg is 'effective' at a time. 'Defined' is what's saved; 'effective' is what's active." },
            { t: "Director", d: "A large chassis-based FC switch (e.g. Brocade X6/X7) with blades, redundant everything, and hundreds of ports. Used as the fabric core." },
            { t: "Basic commands", d: "switchshow, fabricshow, nsshow, zoneshow, cfgshow, portshow <n>, porterrshow, sfpshow, errdump, supportsave." }
          ],
          quiz: [
            { q: "You added a zone with zonecreate and cfgadd, but the host still can't see storage. What did you forget?", o: ["cfgsave + cfgenable", "reboot", "alicreate", "switchshow"], a: 0, e: "The change isn't active until you save and enable the configuration." },
            { q: "A port connected to another switch is a…", o: ["F_Port", "E_Port", "N_Port", "L_Port"], a: 1, e: "E_Port = ISL." },
            { q: "Which command lists devices logged into the name server?", o: ["nsshow", "cfgsave", "sfpshow", "errdump"], a: 0, e: "nsshow lists the local switch's name server entries." }
          ]
        }
      ],
      activities: [
        {
          type: "sort", title: "Zoning flow", desc: "Brocade zoning, step by step: put each command in its stage.",
          buckets: ["1 · Name it", "2 · Zone it", "3 · Add to config", "4 · Make it live"],
          items: [
            { text: "alicreate", b: 0 }, { text: "zonecreate", b: 1 }, { text: "zoneadd", b: 1 },
            { text: "cfgadd", b: 2 }, { text: "cfgcreate", b: 2 }, { text: "cfgsave", b: 3 }, { text: "cfgenable", b: 3 }
          ]
        },
        {
          "type": "match",
          "title": "Brocade Command Match",
          "desc": "Click a command, then click what it does.",
          "pairs": [
            [
              "switchshow",
              "Ports & their status"
            ],
            [
              "nsshow",
              "Devices in the name server"
            ],
            [
              "cfgshow",
              "The zoning configuration"
            ],
            [
              "alicreate",
              "Name a WWPN"
            ],
            [
              "cfgenable",
              "Activate a zoning config"
            ],
            [
              "sfpshow",
              "Optics (SFP) details"
            ],
            [
              "porterrshow",
              "Port error counters"
            ],
            [
              "supportsave",
              "Collect logs for support"
            ]
          ]
        },
        {
          "type": "truefalse",
          "title": "Fabric Myths",
          "desc": "True or false? 3 lives ❤️❤️❤️.",
          "items": [
            {
              "s": "Best practice: one big zone with every host and storage port.",
              "ok": false,
              "e": "Use single-initiator zones."
            },
            {
              "s": "FLOGI happens before PLOGI.",
              "ok": true,
              "e": "First log into the fabric, then into the target."
            },
            {
              "s": "An E_Port connects a switch to a host.",
              "ok": false,
              "e": "E_Port = switch-to-switch (ISL). F_Port faces devices."
            },
            {
              "s": "A WWPN identifies a single FC port.",
              "ok": true,
              "e": "The WWNN identifies the whole node."
            },
            {
              "s": "A new zone works right after zonecreate.",
              "ok": false,
              "e": "You still need cfgadd, cfgsave and cfgenable."
            },
            {
              "s": "Two separate fabrics (A and B) give redundancy.",
              "ok": true,
              "e": "Every host and array connects to both."
            }
          ]
        },
        {
          "type": "wordguess",
          "title": "SAN Word Guess",
          "desc": "Guess the SAN word in 6 tries.",
          "words": [
            {
              "w": "ZONE",
              "hint": "Who may talk to whom"
            },
            {
              "w": "FABRIC",
              "hint": "Interconnected FC switches"
            },
            {
              "w": "ALIAS",
              "hint": "A friendly name for a WWPN"
            },
            {
              "w": "FLOGI",
              "hint": "Fabric login"
            },
            {
              "w": "DIRECTOR",
              "hint": "A big chassis FC switch"
            }
          ]
        },
        {
          "type": "pinpoint",
          "title": "Pinpoint",
          "desc": "Guess the term from as few clues as you can!",
          "puzzles": [
            {
              "clues": [
                "Single initiator",
                "Hard or soft",
                "cfgenable",
                "Fabric",
                "Who talks to whom"
              ],
              "answers": [
                "zoning",
                "zone"
              ],
              "reveal": "Zoning controls which ports can talk to each other on the fabric."
            },
            {
              "clues": [
                "Many virtual WWPNs",
                "One physical port",
                "Access Gateway uses it",
                "VMs get their own identity",
                "N_Port ID Virtualization"
              ],
              "answers": [
                "npiv"
              ],
              "reveal": "NPIV: one port, many virtual WWPNs."
            }
          ]
        },
        {
          "type": "blitz",
          "title": "Term Blitz",
          "desc": "60 seconds! Read the definition and hit the matching term. Score 10 to win.",
          "target": 10
        }
      ],
      labs: [],
      test: { url: "", questions: [] }
    },
    {
      id: "object", num: 8, title: "Object Storage", he: "Object Storage", duration: "1 week", mode: "Theory",
      icon: "🪣", color: "#CF63CF",
      intro: "Object storage holds billions of objects in flat buckets, accessed over HTTP. Learn the data model, the S3 API, and how it protects data at scale. (The source sheet lists only S3 and Swift; the extra terms here are suggested, so edit them freely.)",
      sections: [
        {
          title: "The object model",
          terms: [
            { t: "Object", d: "Data + metadata + a unique key. There are no folders and no in-place edits: you PUT a whole new version." },
            { t: "Bucket", d: "A top-level flat container of objects with its own policies (access, versioning, lifecycle). '/' in keys only looks like folders." },
            { t: "Key", d: "The object's unique name inside a bucket, e.g. backups/2026/db01.bak." },
            { t: "Metadata", d: "Key-value information stored with the object (content-type, custom tags). It makes searching and lifecycle rules possible." },
            { t: "Tenant / Account", d: "An isolated customer namespace on a shared object store, with its own buckets, users and quotas." }
          ],
          quiz: [
            { q: "How do you change one byte in the middle of an object?", o: ["Edit in place", "Upload (PUT) a new version of the whole object", "Use SMB", "Defragment"], a: 1, e: "Objects are immutable. You rewrite the whole object." },
            { q: "Folders in S3 are…", o: ["Real directories", "Just prefixes in the key name", "Separate buckets", "LUNs"], a: 1, e: "The namespace is flat. '/' is just part of the key." }
          ]
        },
        {
          title: "APIs & access",
          terms: [
            { t: "S3 API", d: "The de-facto standard REST API: PUT, GET, DELETE, LIST, HEAD and multipart upload, over HTTPS." },
            { t: "Swift", d: "The OpenStack object API: accounts → containers → objects." },
            { t: "Access key / Secret key", d: "S3 credentials. Every request is signed with them (SigV4). Treat the secret like a password." },
            { t: "Endpoint", d: "The HTTPS URL clients send S3 requests to (e.g. https://s3.company.local), usually through a load balancer." },
            { t: "Multipart upload", d: "Splits a big object into parts that upload in parallel and can be retried individually. Used for large backups." }
          ],
          quiz: [
            { q: "S3 requests are authenticated with…", o: ["Kerberos tickets", "Access key + secret key signatures", "WWPNs", "Export policies"], a: 1, e: "Each request is signed using the secret key." },
            { q: "Best way to upload a 500 GB backup file to S3?", o: ["Single PUT", "Multipart upload", "FTP", "SMB copy"], a: 1, e: "Multipart is parallel and resumable." }
          ]
        },
        {
          title: "Protection & lifecycle",
          terms: [
            { t: "Erasure coding", d: "Splits an object into data + parity fragments spread across nodes or sites (e.g. 4+2). Survives losing fragments while using less space than full copies." },
            { t: "Replication (copies)", d: "Keeps whole copies of each object on several nodes or sites. Simple and fast, but uses more capacity than erasure coding." },
            { t: "Versioning", d: "Keeps old versions when an object is overwritten or deleted, protecting against mistakes and ransomware." },
            { t: "Object Lock / WORM", d: "Makes objects immutable for a retention period, so they can't be deleted or changed. Used for compliance and backup protection." },
            { t: "Lifecycle policy", d: "Rules that move objects to cheaper tiers or delete them after X days." },
            { t: "StorageGRID", d: "NetApp's S3 object storage product. It's also a FabricPool tiering target for ONTAP." }
          ],
          quiz: [
            { q: "Which uses less raw capacity for the same protection?", o: ["3 full copies", "Erasure coding (e.g. 4+2)", "RAID 0", "Snapshots"], a: 1, e: "4+2 costs 1.5× the raw capacity, compared with 3× for three copies." },
            { q: "Backups must be undeletable for 30 days, even by admins. Use…", o: ["Lifecycle delete", "Object Lock (WORM)", "Multipart upload", "Public bucket"], a: 1, e: "Object Lock enforces immutability." }
          ]
        }
      ],
      activities: [
        {
          "type": "truefalse",
          "title": "Object Myths",
          "desc": "True or false? 3 lives ❤️❤️❤️.",
          "items": [
            {
              "s": "Folders in S3 are real directories.",
              "ok": false,
              "e": "They're just key prefixes. The namespace is flat."
            },
            {
              "s": "You can change bytes in the middle of an object in place.",
              "ok": false,
              "e": "You upload a new version of the whole object."
            },
            {
              "s": "Erasure coding 4+2 uses less raw capacity than 3 full copies.",
              "ok": true,
              "e": "1.5× compared with 3×."
            },
            {
              "s": "Object Lock can make backups undeletable for a retention period.",
              "ok": true,
              "e": "WORM protects against ransomware and mistakes."
            },
            {
              "s": "S3 requests are signed using an access key and secret key.",
              "ok": true,
              "e": "Keep the secret key safe."
            },
            {
              "s": "Multipart upload is mainly for tiny files.",
              "ok": false,
              "e": "It's for big objects: parallel and resumable."
            }
          ]
        },
        {
          "type": "wordguess",
          "title": "Object Word Guess",
          "desc": "Guess the object storage word in 6 tries.",
          "words": [
            {
              "w": "BUCKET",
              "hint": "A flat container of objects"
            },
            {
              "w": "OBJECT",
              "hint": "Data + metadata + key"
            },
            {
              "w": "SWIFT",
              "hint": "OpenStack's object API"
            },
            {
              "w": "TENANT",
              "hint": "An isolated customer namespace"
            }
          ]
        },
        {
          "type": "blitz",
          "title": "Term Blitz",
          "desc": "60 seconds! Read the definition and hit the matching term. Score 8 to win.",
          "target": 8
        }
      ],
      labs: [
        { title: "AWS S3 – Getting started", kind: "external", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html", desc: "The official intro to buckets, objects and the S3 API." },
        { title: "NetApp StorageGRID docs", kind: "external", url: "https://docs.netapp.com/us-en/storagegrid/", desc: "NetApp's object storage: grids, sites, ILM policies and erasure coding." }
      ],
      test: { url: "", questions: [] }
    },
    {
      id: "hardware", num: 9, title: "Hardware", he: "חומרה", duration: "1 day", mode: "Frontal + DC tour",
      icon: "🖥️", color: "#FF6680",
      intro: "One day: a frontal session and a tour of the data center halls (סיור באולמות DC). Get to know the server families the team runs (HP, Cisco UCS and Dell) and their management tools.",
      sections: [
        {
          title: "General",
          terms: [
            { t: "HP vs Cisco servers", d: "HP (HPE) BladeSystem/Synergy uses Onboard Administrator + Virtual Connect per enclosure, managed via iLO. Cisco UCS uses central Fabric Interconnects + UCS Manager with stateless service profiles across all chassis." },
            { t: "Blades, HP BladeSystem", d: "Thin servers that slide into a shared enclosure (c7000) which provides power, cooling and networking. That means dense racks and fewer cables." },
            { t: "RAC servers ('pizza')", d: "Rack-mount servers (1U/2U, flat like a pizza box), each with its own power and NICs, e.g. HPE DL380 and Dell R740." },
            { t: "Address standard (סטנדרט כתובות)", d: "The team's standard for naming and addressing management interfaces (iLO/iDRAC/OA). Ask your mentor for the current document." }
          ],
          quiz: [
            { q: "Which form factor shares power and cooling in an enclosure?", o: ["Rack ('pizza') server", "Blade", "Tower", "Laptop"], a: 1, e: "Blades share the chassis infrastructure." },
            { q: "Cisco UCS centralizes management in…", o: ["iLO", "Fabric Interconnects + UCS Manager", "iDRAC", "OpenManage"], a: 1, e: "UCS Manager runs on the FIs." }
          ]
        },
        {
          title: "HP",
          terms: [
            { t: "iLO", d: "Integrated Lights-Out: HP's out-of-band management. Remote console, power control, virtual media and hardware health, even when the OS is down." },
            { t: "Virtual Connect Manager", d: "Manages the Virtual Connect modules in a c7000 enclosure. It virtualizes server MACs/WWNs and maps the blades' NICs/HBAs to uplinks." },
            { t: "Onboard Administrator", d: "OA: the enclosure's management module. Power, cooling, blade inventory, and the gateway to each blade's iLO." },
            { t: "LOM", d: "LAN On Motherboard: the network ports built into the server board." },
            { t: "Mezzanine", d: "An expansion card slot in a blade (extra NICs/HBAs) that connects to the enclosure's interconnect bays." },
            { t: "Flex-10", d: "HP technology that splits one 10Gb port into up to 4 FlexNICs with configurable bandwidth." },
            { t: "FlexFabric", d: "A Flex-10 evolution: a port can be split into NICs and also a FlexHBA (FCoE/iSCSI) for storage traffic." },
            { t: "Server Profiles", d: "In Virtual Connect, a profile holds a server's identity (MACs, WWNs, network and SAN connections). Moving the profile moves the identity to another bay." },
            { t: "Device bays", d: "The numbered slots in the enclosure where the blades sit (16 half-height in a c7000)." }
          ],
          quiz: [
            { q: "The OS is frozen and you need a remote console to an HP server:", o: ["iLO", "SCCM", "vCenter", "Brocade"], a: 0, e: "iLO is out-of-band." },
            { q: "Which component splits a 10Gb port into several FlexNICs?", o: ["Flex-10", "LOM", "Mezzanine", "Device bay"], a: 0, e: "Flex-10 / FlexFabric." }
          ]
        },
        {
          title: "Cisco UCS",
          terms: [
            { t: "FI (Fabric Interconnect)", d: "A pair of switches (A/B) that every UCS chassis connects to. They run UCS Manager and carry LAN + SAN traffic." },
            { t: "Server (service) profiles", d: "A server's entire identity (UUID, MACs, WWNs, BIOS, boot order, firmware) as a policy. Apply it to any blade and that blade becomes the server." },
            { t: "UCS Manager", d: "The management software on the FIs that controls every chassis, blade, profile and policy in the domain." },
            { t: "KVM manager", d: "Remote keyboard-video-mouse console to UCS servers via the CIMC." },
            { t: "Enclosure / chassis", d: "The physical box that holds the blades (e.g. UCS 5108), with IOMs that uplink to the FIs." }
          ],
          quiz: [
            { q: "In UCS, what makes a blade 'stateless'?", o: ["iLO", "Service profiles", "Mezzanine", "RAID"], a: 1, e: "The identity lives in the profile, not the hardware." },
            { q: "UCS chassis uplink to…", o: ["Fabric Interconnects", "Onboard Administrator", "iDRAC", "A hub"], a: 0, e: "IOMs → FI A and FI B." }
          ]
        },
        {
          title: "Dell",
          terms: [
            { t: "iDRAC", d: "Integrated Dell Remote Access Controller: Dell's out-of-band management (console, power, virtual media, logs)." },
            { t: "OpenManage", d: "Dell's server management suite (OpenManage Enterprise) for monitoring, firmware updates and inventory across many servers." },
            { t: "Slots", d: "PCIe expansion slots in the server for NICs, HBAs, GPUs and RAID controllers. Know which card sits in which slot!" }
          ],
          quiz: [
            { q: "Dell's equivalent of HP iLO:", o: ["iDRAC", "OA", "FI", "VCM"], a: 0, e: "iDRAC." },
            { q: "Manage firmware updates across 200 Dell servers:", o: ["OpenManage", "regedit", "Brocade", "putty"], a: 0, e: "OpenManage Enterprise." }
          ]
        }
      ],
      activities: [
        {
          type: "sort", title: "Who makes it?", desc: "Match each management component to its vendor.",
          buckets: ["HP", "Cisco", "Dell"],
          items: [
            { text: "iLO", b: 0 }, { text: "Onboard Administrator", b: 0 }, { text: "Virtual Connect", b: 0 }, { text: "Flex-10", b: 0 },
            { text: "Fabric Interconnect", b: 1 }, { text: "UCS Manager", b: 1 }, { text: "Service profile", b: 1 },
            { text: "iDRAC", b: 2 }, { text: "OpenManage", b: 2 }
          ]
        },
        {
          "type": "match",
          "title": "Acronym Match",
          "desc": "Click an acronym, then click what it means.",
          "pairs": [
            [
              "iLO",
              "HP out-of-band management"
            ],
            [
              "iDRAC",
              "Dell out-of-band management"
            ],
            [
              "OA",
              "HP enclosure management module"
            ],
            [
              "FI",
              "Cisco UCS fabric switch pair"
            ],
            [
              "LOM",
              "NICs on the motherboard"
            ],
            [
              "VCM",
              "Manages HP Virtual Connect"
            ],
            [
              "UCSM",
              "Manages all UCS chassis & profiles"
            ]
          ]
        },
        {
          "type": "wordguess",
          "title": "Hardware Word Guess",
          "desc": "Guess the hardware word in 6 tries.",
          "words": [
            {
              "w": "BLADE",
              "hint": "A thin server in an enclosure"
            },
            {
              "w": "CHASSIS",
              "hint": "The box that holds blades"
            },
            {
              "w": "IDRAC",
              "hint": "Dell's remote management"
            },
            {
              "w": "SLOTS",
              "hint": "Where PCIe cards go"
            }
          ]
        },
        {
          "type": "pinpoint",
          "title": "Pinpoint",
          "desc": "Guess the term from as few clues as you can!",
          "puzzles": [
            {
              "clues": [
                "HP",
                "Remote console",
                "Out-of-band",
                "Works when the OS is down",
                "Lights-Out"
              ],
              "answers": [
                "ilo"
              ],
              "reveal": "iLO: HP's Integrated Lights-Out."
            },
            {
              "clues": [
                "Cisco",
                "Stateless",
                "UUID, MACs, WWNs",
                "Apply to any blade",
                "Server identity"
              ],
              "answers": [
                "service profile",
                "server profile",
                "service profiles",
                "server profiles"
              ],
              "reveal": "UCS service profiles carry the server's identity."
            }
          ]
        },
        {
          "type": "blitz",
          "title": "Term Blitz",
          "desc": "60 seconds! Read the definition and hit the matching term. Score 8 to win.",
          "target": 8
        }
      ],
      labs: [
        {
          title: "DC tour checklist", he: "סיור באולמות DC", kind: "checklist",
          desc: "Tick these off during the data-center tour.",
          steps: [
            "Find a blade enclosure and count its device bays.",
            "Spot an Onboard Administrator / Fabric Interconnect.",
            "Find a rack ('pizza') server and its iLO/iDRAC port.",
            "Identify a NetApp controller and its disk shelves.",
            "Find the SAN switches (fabric A and B).",
            "See how cables are labeled according to the team standard.",
            "Ask: what's the procedure for entering the DC hall?"
          ]
        }
      ],
      test: { url: "", questions: [] }
    },
    {
      id: "virt-net", num: 10, title: "Network Virtualization", he: "וירטואליזציה תקשורת", duration: "2 weeks", mode: "Theory + Lab",
      icon: "🔀", color: "#4CBFE6",
      intro: "Inside every ESXi host there's a virtual network: vSwitches, port groups, uplinks and VMkernel ports. Learn how VMs reach the physical network, how teaming balances and fails over traffic, and which security policies to watch.",
      sections: [
        {
          title: "Basic concepts",
          terms: [
            { t: "VMware", d: "The virtualization vendor whose vSphere platform (ESXi + vCenter) runs the team's VMs." },
            { t: "Hypervisor (ESXi)", d: "A type-1 (bare-metal) hypervisor installed directly on the server. It shares CPU, RAM, storage and network between VMs." },
            { t: "VM", d: "Virtual Machine: a set of files (config, disks) that ESXi runs as a full computer with virtual hardware." },
            { t: "vCenter", d: "The central management server for many ESXi hosts. It enables clusters, vMotion, DRS, HA and distributed switches." },
            { t: "Cluster", d: "A group of ESXi hosts managed as one pool of resources, with HA/DRS." },
            { t: "Datacenter", d: "The top-level container in vCenter inventory. It holds clusters, hosts, datastores and networks." }
          ],
          quiz: [
            { q: "Which component is required for vMotion, DRS and distributed switches?", o: ["ESXi alone", "vCenter", "DCUI", "VMware Tools"], a: 1, e: "These are vCenter features." },
            { q: "ESXi is a…", o: ["Type-2 hypervisor on Windows", "Type-1 bare-metal hypervisor", "Container runtime", "Storage OS"], a: 1, e: "It's installed directly on the hardware." }
          ]
        },
        {
          title: "Virtual networking",
          terms: [
            { t: "vSwitch", d: "A Standard vSwitch: a software L2 switch configured separately on each ESXi host." },
            { t: "Distributed vSwitch", d: "dvSwitch / VDS: one switch defined in vCenter and pushed to many hosts, giving consistent configuration plus extra features (LACP, NetFlow, port mirroring)." },
            { t: "Portgroup", d: "A group of ports on a standard vSwitch with the same policy, usually one VLAN. VMs connect to portgroups." },
            { t: "dvPortgroup", d: "A portgroup on a distributed switch, defined once for all hosts." },
            { t: "Uplinks", d: "The physical NICs (or dvUplinks) that connect a virtual switch to the physical network." },
            { t: "vmnics", d: "ESXi's names for the physical NICs: vmnic0, vmnic1…" },
            { t: "vNIC", d: "The VM's virtual network card, connected to a portgroup." },
            { t: "e1000", d: "An emulated Intel 1Gb NIC. Most OSes recognize it without drivers, but it has higher CPU overhead." },
            { t: "vlance", d: "An emulated old AMD PCnet32 10Mb NIC, for very old guest OSes." },
            { t: "Flexible NICs", d: "Acts as vlance at boot, then switches to vmxnet once VMware Tools loads (legacy guests)." },
            { t: "vmxnet (vmxnet3)", d: "A paravirtual NIC optimized for virtualization: 10Gb+, low CPU. Needs VMware Tools drivers. The recommended choice." },
            { t: "VMkernel Port (Management Network)", d: "vmk0, vmk1…: ESXi's own IP interfaces for management, vMotion, NFS/iSCSI storage, FT and vSAN traffic." },
            { t: "NIC Teaming", d: "Several uplinks serve one vSwitch/portgroup for redundancy and load sharing." },
            { t: "Load Balancing", d: "How traffic is spread across the team's uplinks: by port ID, MAC hash, IP hash, or physical NIC load (dvSwitch only)." },
            { t: "IP Hash", d: "Chooses the uplink by hashing source + destination IP. Needs a static EtherChannel/port-channel on the physical switch." },
            { t: "MAC Hash", d: "Chooses the uplink by hashing the VM's source MAC." },
            { t: "Port Based", d: "The default: each virtual port is pinned to one uplink by its port ID. Simple, and no physical switch config needed." },
            { t: "Physical NIC Load", d: "LBT, dvSwitch only: moves ports to another uplink when one exceeds 75% utilization." },
            { t: "Failover", d: "When an active uplink fails, its traffic moves to a standby (or another active) uplink." },
            { t: "Failback", d: "When the failed uplink recovers, traffic returns to it automatically (Failback = Yes)." }
          ],
          quiz: [
            { q: "Which vNIC type is recommended for performance?", o: ["e1000", "vlance", "vmxnet3", "Flexible"], a: 2, e: "vmxnet3 is paravirtual: fast with low CPU use." },
            { q: "IP Hash load balancing requires on the physical switch…", o: ["Nothing", "A static port-channel/EtherChannel", "STP disabled", "A trunk with a native VLAN only"], a: 1, e: "Without the port-channel you'll get MAC flapping and drops." },
            { q: "Which ESXi interface carries vMotion traffic?", o: ["vmnic", "A VMkernel port (vmk)", "A vNIC", "The DCUI"], a: 1, e: "vMotion uses a VMkernel adapter with vMotion enabled." },
            { q: "Configure a switch once in vCenter and push it to 20 hosts:", o: ["Standard vSwitch", "Distributed vSwitch", "Portgroup", "vmnic"], a: 1, e: "VDS / dvSwitch." }
          ]
        },
        {
          title: "Security & policies",
          terms: [
            { t: "Notify Switches", d: "On failover, ESXi sends RARP/gratuitous frames so the physical switches update their MAC tables right away." },
            { t: "Security policy", d: "Three settings per vSwitch/portgroup: Promiscuous Mode, MAC Address Changes and Forged Transmits (Accept/Reject)." },
            { t: "Initial MAC address", d: "The MAC VMware assigns to the vNIC (in the .vmx)." },
            { t: "Effective MAC address", d: "The MAC the guest OS actually uses. It can differ if the guest changes it." },
            { t: "Promiscuous Mode", d: "When Accepted, a vNIC receives all frames on the portgroup/VLAN, not just its own. Needed for sniffers and some nested labs." },
            { t: "Forged Transmits", d: "Controls outgoing frames whose source MAC differs from the initial MAC. Reject drops them." },
            { t: "MAC Address Changes", d: "Controls incoming traffic when the guest changes its effective MAC. Reject = no traffic is delivered to the changed MAC." },
            { t: "Traffic Shaping", d: "Limits average/peak bandwidth and burst size: outbound on a standard vSwitch, in/out on a dvSwitch." },
            { t: "Network Failover Detection – Link Status", d: "Detects uplink failure from the physical link state only (cable/switch port down)." },
            { t: "Network Failover Detection – Beacon Probing", d: "Sends beacons between uplinks to also detect upstream failures. Needs 3+ uplinks to work well." },
            { t: "Failover order (Active, Standby, Unused)", d: "Active uplinks carry traffic, Standby ones take over on failure, Unused ones are never used by this portgroup." },
            { t: "Networking Policy Concepts (Standard vSwitch)", d: "Policies (security, teaming, shaping, VLAN) are set on the vSwitch and inherited by portgroups, which can override them." },
            { t: "Using Standard vSwitch Policies", d: "Best practice: set common defaults on the vSwitch and override only on specific portgroups (e.g. a different active uplink for vMotion)." }
          ],
          quiz: [
            { q: "A packet sniffer VM sees only its own traffic. Which setting must be Accepted?", o: ["Forged Transmits", "Promiscuous Mode", "Notify Switches", "Failback"], a: 1, e: "Promiscuous Mode lets the vNIC see all frames on the portgroup." },
            { q: "Policies set on a vSwitch and on a portgroup conflict. Which wins?", o: ["vSwitch", "Portgroup override", "Random", "The last host rebooted"], a: 1, e: "Portgroups inherit, but their overrides take precedence." },
            { q: "Detect a failure in the upstream switch even though the link stays up:", o: ["Link status", "Beacon probing", "Traffic shaping", "MAC hash"], a: 1, e: "Beacon probing catches failures beyond the first hop." }
          ]
        }
      ],
      activities: [
        {
          type: "pick", title: "Teaming quiz-pick", desc: "Which load-balancing methods need NO special configuration on the physical switch? Pick all that apply.",
          items: [
            { text: "Route based on originating virtual port", ok: true }, { text: "Route based on source MAC hash", ok: true },
            { text: "Route based on IP hash", ok: false }, { text: "Route based on physical NIC load (dvSwitch)", ok: true }, { text: "LACP", ok: false }
          ]
        },
        {
          "type": "match",
          "title": "Teaming Match",
          "desc": "Click a setting, then click what it does.",
          "pairs": [
            [
              "Port based",
              "Default: pins each virtual port to one uplink"
            ],
            [
              "IP hash",
              "Needs a port-channel on the physical switch"
            ],
            [
              "MAC hash",
              "Uplink chosen by the VM's MAC"
            ],
            [
              "Physical NIC load",
              "dvSwitch only: rebalances at 75%"
            ],
            [
              "Beacon probing",
              "Detects upstream failures"
            ],
            [
              "Notify switches",
              "Updates physical MAC tables on failover"
            ],
            [
              "Failback",
              "Returns to the recovered uplink"
            ]
          ]
        },
        {
          "type": "truefalse",
          "title": "vSwitch Myths",
          "desc": "True or false? 3 lives ❤️❤️❤️.",
          "items": [
            {
              "s": "A sniffer VM needs Promiscuous Mode set to Accept.",
              "ok": true,
              "e": "Otherwise it only sees its own traffic."
            },
            {
              "s": "A portgroup override beats the vSwitch policy.",
              "ok": true,
              "e": "Portgroups inherit, but can override."
            },
            {
              "s": "vmxnet3 needs VMware Tools drivers.",
              "ok": true,
              "e": "It's paravirtual."
            },
            {
              "s": "A standard vSwitch is configured once in vCenter for all hosts.",
              "ok": false,
              "e": "That's the distributed switch. Standard vSwitches are per host."
            },
            {
              "s": "vMotion traffic goes over a VMkernel port.",
              "ok": true,
              "e": "A vmk with the vMotion service enabled."
            },
            {
              "s": "IP hash works with no physical switch configuration.",
              "ok": false,
              "e": "It needs a static port-channel."
            }
          ]
        },
        {
          "type": "connections",
          "title": "vNetwork Connections",
          "desc": "Find 4 groups of 4. Select four tiles and hit Submit. 4 mistakes allowed!",
          "groups": [
            {
              "name": "vNIC types",
              "items": [
                "E1000",
                "VMXNET3",
                "VLANCE",
                "FLEXIBLE"
              ]
            },
            {
              "name": "Load balancing methods",
              "items": [
                "IP HASH",
                "MAC HASH",
                "PORT ID",
                "NIC LOAD"
              ]
            },
            {
              "name": "Failover settings",
              "items": [
                "FAILBACK",
                "NOTIFY SWITCHES",
                "BEACON PROBING",
                "LINK STATUS"
              ]
            },
            {
              "name": "Security policy",
              "items": [
                "PROMISCUOUS",
                "FORGED TRANSMITS",
                "MAC CHANGES",
                "TRAFFIC SHAPING"
              ]
            }
          ]
        },
        {
          "type": "wordguess",
          "title": "vNetwork Word Guess",
          "desc": "Guess the virtual-networking word in 6 tries.",
          "words": [
            {
              "w": "UPLINK",
              "hint": "Connects a virtual switch to the physical world"
            },
            {
              "w": "VMNIC",
              "hint": "A physical NIC, as ESXi calls it"
            },
            {
              "w": "VSWITCH",
              "hint": "A per-host software switch"
            },
            {
              "w": "VMKERNEL",
              "hint": "ESXi's own IP interface"
            }
          ]
        },
        {
          "type": "blitz",
          "title": "Term Blitz",
          "desc": "60 seconds! Read the definition and hit the matching term. Score 10 to win.",
          "target": 10
        }
      ],
      labs: [
        {
          title: "Network virtualization lab", he: "מעבדת וירטואליזציה – תקשורת", kind: "internal",
          desc: "General rules: every component you touch must stay connected, unless stated otherwise. Try to solve things alone first, then ask your mentor or a teammate. Be bold: you're in a lab, so experiment and don't be afraid to make mistakes. In vCenter, Configure → Topology on a dvSwitch shows everything connected to it, and on a host, Configure → Virtual Switches does the same.",
          steps: [
            "Prep: after creating your vservers (storage lab), ask for zones for both hosts. Don't touch the Brocades if nobody from the team is with you!",
            "Prep: deploy a vCenter (your mentor can help). Add the lab hosts (install ESXi if needed).",
            "Prep: create a datastore from each vserver and make sure it's connected. For the SAN vserver, create an igroup and map the LUN.",
            "Create a new dvSwitch and connect both lab hosts to it.",
            "Create a vSwitch on one of the hosts.",
            "Move one host from the dvSwitch to the vSwitch, then back again.",
            "Remove the second host from the dvSwitch. Self-check: one host should be connected to the vSwitch only, with nothing on the dvSwitch.",
            "Create a VM on the host that's connected to the vSwitch.",
            "Connect both hosts back to the dvSwitch. Move the VM from the vSwitch to the dvSwitch, then back again.",
            "Create another dvPortgroup on the dvSwitch, and another portgroup on the vSwitch.",
            "Connect to the host's management, create another vSwitch, and move a VM from the existing vSwitch to the new one.",
            "Move the VM from the new vSwitch to the existing dvSwitch. Did it work? Why?",
            "Change a portgroup's Security Profile (MAC Address Changes, Promiscuous Mode) so it applies to all of the PG's dvUplinks.",
            "Change Teaming and Failover: Load Balancing, Notify Switches, Failback, Active/Standby uplinks.",
            "Change the VLAN of portgroups (at random). Think about what that does, and which portgroups' VLANs you must NOT change.",
            "On both hosts, create a new vmk with an IP address and enable vMotion on it. vMotion a VM through that vmk.",
            "On one host, swap the vMotion vmk (vmk1) and the Management vmk roles, and check the result.",
            "Add a vNIC of type e1000 to a VM, then one of type vmxnet.",
            "Change the host's management IP: (a) through the vSphere Client, (b) through the DCUI (ask how to get to it).",
            "In the DCUI: Restore to dvSwitch, then look at the topology in vCenter. What changed? Then Restore to vSwitch, and then Restore Network Settings. If the host loses connectivity, getting it back is your last task. Good luck!",
            "Part 2: design a host network where Management and vMotion go out on different physical vmnics, so the two never share a vmnic. Sketch it, then build it in the lab."
          ]
        },
        { title: "VMware Hands-on Labs", kind: "external", url: "https://labs.hol.vmware.com/", desc: "Free, full vSphere environments in your browser. Search for the vSphere networking / vSphere Distributed Switch labs." }
      ],
      test: { url: "", questions: [] }
    },
    {
      id: "virt-storage", num: 11, title: "Storage Virtualization", he: "וירטואליזציה אחסון", duration: "2 weeks", mode: "Theory + Lab",
      icon: "📦", color: "#9966FF",
      intro: "How do VMs store data? Learn datastores (VMFS/NFS), multipathing, virtual disk formats, RDMs, snapshots, and every file that makes up a VM.",
      sections: [
        {
          title: "Datastores & virtual disks",
          terms: [
            { t: "NFS Datastores", d: "An NFS export (e.g. from a NetApp SVM) mounted by ESXi through a VMkernel port. The filesystem belongs to the storage, so sizing is easy and thin by nature." },
            { t: "VMFS Datastores", d: "VMware's clustered filesystem, formatted by ESXi on a block LUN (FC/iSCSI) and shared by many hosts at once." },
            { t: "Path Selection Policy & Multi-Pathing", d: "The PSP decides how ESXi uses multiple paths to a LUN: Fixed, MRU (Most Recently Used), or Round Robin (balances I/O across all active paths)." },
            { t: "VMDK – Thin / Thick Lazy / Thick Eager", d: "Thin allocates space as data is written. Thick Lazy Zeroed allocates everything up front and zeroes blocks on first write. Thick Eager Zeroed allocates and zeroes everything at creation (required for FT and shared disks)." },
            { t: "Alignment", d: "The guest partitions should start on boundaries that match the storage blocks. Misalignment makes one guest I/O touch two storage blocks, which hurts performance." },
            { t: "Virtual SCSI Adapter", d: "The VM's virtual disk controller: LSI Logic SAS, or VMware Paravirtual (PVSCSI, best for heavy I/O). Up to 4 controllers per VM." },
            { t: "SCSI Bus Sharing", d: "Lets VMs share virtual disks on the same controller (None / Virtual / Physical). Used for clusters such as Oracle RAC and MSCS." },
            { t: "RDM (Physical, Virtual)", d: "Raw Device Mapping: a VM accesses a LUN directly through a mapping file. Virtual mode allows VMware snapshots. Physical mode passes SCSI commands through (needed for some cluster/SAN tools, but no snapshots)." },
            { t: "VMware Snapshot files", d: "Taking a snapshot creates a delta (-00000x.vmdk) per disk plus .vmsn (state) and updates .vmsd. Writes go to the delta until you delete/consolidate." },
            { t: "Independent Persistent / Non-Persistent", d: "Independent disks are excluded from snapshots. Persistent: changes are written immediately and permanently. Non-persistent: changes are discarded at power-off." }
          ],
          quiz: [
            { q: "Which VMDK type is required for shared disks (e.g. Oracle RAC) and FT?", o: ["Thin", "Thick Lazy Zeroed", "Thick Eager Zeroed", "Any"], a: 2, e: "Eager Zeroed: fully allocated and zeroed up front." },
            { q: "Which PSP spreads I/O across all active paths?", o: ["Fixed", "MRU", "Round Robin", "None"], a: 2, e: "Round Robin." },
            { q: "You need VMware snapshots on an RDM. Which mode?", o: ["Physical", "Virtual", "Independent", "Neither"], a: 1, e: "Virtual compatibility mode supports snapshots." },
            { q: "A disk set to Independent Non-Persistent. What happens at power-off?", o: ["Changes are kept", "Changes are discarded", "The disk is deleted", "A snapshot is taken"], a: 1, e: "It reverts to its original state." }
          ]
        },
        {
          title: "VM file types",
          terms: [
            { t: "VMDK (Descriptor, Flat, Delta, RDM)", d: "vm.vmdk is a small text descriptor. vm-flat.vmdk holds the actual data. vm-00000x.vmdk (delta) holds snapshot changes. vm-rdm.vmdk / -rdmp.vmdk is the RDM mapping file." },
            { t: "VMX + VMXF", d: ".vmx is the VM's main configuration file (hardware, devices, options). .vmxf holds extra team/config info." },
            { t: "NVRAM", d: ".nvram stores the VM's BIOS/EFI settings." },
            { t: "VMSD", d: ".vmsd is the snapshot metadata database (the snapshot list and tree)." },
            { t: "VMSN", d: ".vmsn is a snapshot's state file (the VM's state at snapshot time, including memory if it was included)." },
            { t: "VMSS", d: ".vmss is the suspend state file, written when a VM is suspended." },
            { t: "LOG", d: "vmware.log (plus rotated copies): the VM's log. Look here first when a VM fails to power on." },
            { t: "vswp", d: ".vswp is the VM swap file, created at power-on with size = configured RAM minus reservation. A full datastore means the VM can't power on!" }
          ],
          quiz: [
            { q: "Which file actually contains the virtual disk's data?", o: ["vm.vmdk", "vm-flat.vmdk", "vm.vmx", "vm.vmsd"], a: 1, e: "-flat.vmdk is the data; .vmdk is just the descriptor." },
            { q: "A VM with 32 GB RAM and a 32 GB reservation. How big is its .vswp?", o: ["32 GB", "16 GB", "0 GB", "64 GB"], a: 2, e: "vswp = configured RAM − reservation = 0." },
            { q: "Where do you look first when a VM fails to power on?", o: ["vmware.log", ".nvram", ".vmsd", "-flat.vmdk"], a: 0, e: "vmware.log in the VM folder." }
          ]
        }
      ],
      activities: [
        {
          type: "sort", title: "What's in the VM folder?", desc: "Sort each file into its job.",
          buckets: ["Virtual disk", "Configuration", "Snapshot / suspend", "Runtime & logs"],
          items: [
            { text: "vm.vmdk", b: 0 }, { text: "vm-flat.vmdk", b: 0 }, { text: "vm-000001.vmdk", b: 0 },
            { text: ".vmx", b: 1 }, { text: ".vmxf", b: 1 }, { text: ".nvram", b: 1 },
            { text: ".vmsd", b: 2 }, { text: ".vmsn", b: 2 }, { text: ".vmss", b: 2 },
            { text: ".vswp", b: 3 }, { text: "vmware.log", b: 3 }
          ]
        },
        {
          "type": "memory",
          "title": "VM File Memory",
          "desc": "Match each file to its job.",
          "pairs": [
            [
              ".vmx",
              "VM configuration"
            ],
            [
              "-flat.vmdk",
              "Virtual disk data"
            ],
            [
              ".vmsd",
              "Snapshot list"
            ],
            [
              ".vswp",
              "VM swap file"
            ],
            [
              ".nvram",
              "BIOS/EFI settings"
            ],
            [
              "vmware.log",
              "The VM's log"
            ]
          ]
        },
        {
          "type": "fill",
          "title": "Datastore Fill the Gap",
          "desc": "Type the missing word and press Enter.",
          "items": [
            {
              "q": "Shared disks for Oracle RAC must be Thick ___ Zeroed",
              "a": [
                "eager"
              ]
            },
            {
              "q": "The PSP that spreads I/O over all active paths is Round ___",
              "a": [
                "robin"
              ]
            },
            {
              "q": "To take VMware snapshots of an RDM, use ___ compatibility mode",
              "a": [
                "virtual"
              ]
            },
            {
              "q": ".vswp size = configured RAM minus the ___",
              "a": [
                "reservation"
              ]
            },
            {
              "q": "VMware's clustered filesystem on block LUNs is ___",
              "a": [
                "vmfs"
              ]
            },
            {
              "q": "An independent Non-Persistent disk loses its changes at power-___",
              "a": [
                "off"
              ]
            }
          ]
        },
        {
          "type": "wordguess",
          "title": "Datastore Word Guess",
          "desc": "Guess the word in 6 tries.",
          "words": [
            {
              "w": "VMDK",
              "hint": "A virtual disk file"
            },
            {
              "w": "VMFS",
              "hint": "Clustered filesystem on LUNs"
            },
            {
              "w": "EAGER",
              "hint": "Thick ___ Zeroed"
            },
            {
              "w": "DELTA",
              "hint": "The snapshot changes file"
            }
          ]
        },
        {
          "type": "pinpoint",
          "title": "Pinpoint",
          "desc": "Guess the term from as few clues as you can!",
          "puzzles": [
            {
              "clues": [
                "Mapping file",
                "Physical or virtual",
                "Raw",
                "A LUN straight to a VM",
                "Cluster software likes it"
              ],
              "answers": [
                "rdm",
                "raw device mapping"
              ],
              "reveal": "RDM: Raw Device Mapping."
            },
            {
              "clues": [
                "Created at power-on",
                "RAM minus reservation",
                "Can block power-on",
                "Swap",
                "Extension"
              ],
              "answers": [
                "vswp",
                ".vswp"
              ],
              "reveal": "The .vswp file is the VM's swap file."
            }
          ]
        },
        {
          "type": "blitz",
          "title": "Term Blitz",
          "desc": "60 seconds! Read the definition and hit the matching term. Score 8 to win.",
          "target": 8
        }
      ],
      labs: [
        {
          title: "Storage in virtualization lab", he: "מעבדת אחסון בעולם הוירטואליזציה", kind: "internal",
          desc: "General rules: every component you touch must stay up and running, unless stated otherwise. Try alone first, then ask for help. Be bold and experiment.",
          steps: [
            "Create an empty VM on each datastore.",
            "Storage vMotion a VM between 2 datastores: once regular, and once through Advanced (the datastore-selection window).",
            "Map a datastore from the main (dev) VC to your ESX, and make sure you do NOT overwrite the signature.",
            "Unmount and detach a datastore.",
            "Grow a datastore.",
            "Add 3 new 10 GB disks to a VM: (1) Thin, (2) SCSI 1:0 Independent Non-Persistent, Thick Lazy, (3) Independent Persistent, Thick Eager.",
            "Power off the VM, browse its datastore, find the thin VMDK and right-click → Inflate. (This 'inflates' the disk and turns it from Thin to Eager.)",
            "Share disks between VMs, following the Oracle RAC installation procedure (also a training task).",
            "Create 2 new LUNs and map them to a VM as RDMs: the first Virtual, the second Physical.",
            "Storage vMotion that VM to another datastore. Question: what happened to the RDMs?!"
          ]
        },
        { title: "VMware Hands-on Labs", kind: "external", url: "https://labs.hol.vmware.com/", desc: "Search for the vSphere storage labs (VMFS, NFS, Storage vMotion)." }
      ],
      test: { url: "", questions: [] }
    },
    {
      id: "virt-general", num: 12, title: "General Virtualization", he: "וירטואליזציה כללי", duration: "2 weeks", mode: "Theory + Lab",
      icon: "☁️", color: "#FFBF00",
      intro: "Run vSphere like a pro: ESXi management, VM operations and resource controls, and the cluster features (HA, DRS, FT, EVC) that keep everything running.",
      sections: [
        {
          title: "Storage",
          terms: [
            { t: "Swap Datastore", d: "Where the VMs' .vswp files are placed: with the VM (default), or on a datastore set at the host/cluster level (e.g. fast local SSD)." },
            { t: "Storage Policy", d: "SPBM: a policy describing the storage requirements (tier, replication, encryption, vSAN FTT). VMs and disks are placed only on compliant datastores." }
          ],
          quiz: [
            { q: "Where can you set a specific datastore for VM swap files?", o: ["Only per VM", "At the cluster/host level (swap file location)", "In the DCUI only", "Nowhere"], a: 1, e: "Cluster setting → 'Datastore specified by host', then set it on each host." },
            { q: "Which feature places VMs only on datastores that meet requirements?", o: ["Storage Policy", "EVC", "DRS rules", "Shares"], a: 0, e: "Storage Policy Based Management." }
          ]
        },
        {
          title: "ESXi",
          terms: [
            { t: "ESXCLI, Services.sh", d: "esxcli is ESXi's command-line toolset (esxcli network ip interface list, esxcli storage core device list…). services.sh restart restarts the management agents." },
            { t: "DCUI", d: "Direct Console User Interface: the yellow/grey text menu on the host's console (iLO/iDRAC). Set the management IP, restart agents, and restore network settings." },
            { t: "ESXi Standalone", d: "A host managed directly (Host Client) without vCenter. No vMotion, HA or DRS." },
            { t: "ESXi initial configuration", d: "After install: management IP/VLAN, DNS, hostname, NTP, licensing, root password, SSH policy, then add the host to vCenter." },
            { t: "ESXi Host Security", d: "Lockdown mode, SSH/ESXi Shell disabled by default, firewall rules, certificates, AD integration and role-based permissions." },
            { t: "Host Profile", d: "A template captured from a reference host (network, storage, security, NTP). Apply it to other hosts and check them for compliance." }
          ],
          quiz: [
            { q: "vCenter shows a host as 'not responding' but its VMs are fine. A common fix:", o: ["Reinstall ESXi", "Restart the management agents (services.sh restart / DCUI)", "Delete the VMs", "Change the RAID"], a: 1, e: "Restarting hostd/vpxa usually reconnects the host." },
            { q: "Keep 30 hosts configured identically and audit drift:", o: ["Host Profiles", "Templates", "Snapshots", "vCLS"], a: 0, e: "Host Profiles + compliance checks." }
          ]
        },
        {
          title: "VMs",
          terms: [
            { t: "vMotion", d: "Moves a running VM to another host with no downtime: memory is copied over the vMotion network and the CPU state switches over." },
            { t: "Operations on a powered-on VM", d: "vMotion, Storage vMotion, snapshot, hot-add CPU/RAM (if enabled), adding disks/NICs, extending a disk, and changing the network." },
            { t: "VMware Tools", d: "Guest drivers + services: vmxnet3/PVSCSI drivers, graceful shutdown, time sync, heartbeats for HA, quiesced snapshots, and IP reporting." },
            { t: "VM Options, Advanced Parameters", d: "Per-VM settings (boot options, EFI/BIOS, hot-add, latency sensitivity) and advanced .vmx key-value parameters." },
            { t: "Memory contention & Starvation", d: "When VMs demand more RAM than the host has, ESXi reclaims memory through TPS, ballooning, compression and finally swapping, and performance drops." },
            { t: "Shares", d: "Relative priority (Low/Normal/High/custom) for CPU/RAM/disk that only matters when there's contention." },
            { t: "Limit", d: "A hard cap on CPU MHz or RAM a VM can use, even when the host has spare capacity. Use carefully: it can cause ballooning and swapping!" },
            { t: "Reservation", d: "A guaranteed minimum of CPU/RAM for a VM. A full RAM reservation means no .vswp." },
            { t: "Template, OVA, OVF", d: "A template is a master VM image for cloning. OVF is the open VM package format (descriptor + disks). OVA is the same thing as a single tar file." },
            { t: "VMware Snapshots (Pros/Cons)", d: "Pros: a quick rollback point before changes. Cons: they're NOT backups, deltas grow, performance drops, and long chains are risky. Delete them within 24-72 hours." },
            { t: "Powering off a virtual machine", d: "Shut Down Guest (graceful, via Tools) vs Power Off (like pulling the power cord). Prefer a guest shutdown." },
            { t: "Customization Specifications", d: "Saved guest settings (hostname, IP, domain join, license) applied automatically when deploying from a template." }
          ],
          quiz: [
            { q: "Is a VMware snapshot a backup?", o: ["Yes", "No: it depends on the base disk and should be short-lived", "Only if it's thick", "Only on NFS"], a: 1, e: "If the base disk is lost, the snapshot is useless. And chains hurt performance." },
            { q: "Which setting caps a VM even when the host is idle?", o: ["Shares", "Reservation", "Limit", "Affinity"], a: 2, e: "A limit is a hard cap." },
            { q: "Shares only take effect when…", o: ["Always", "There's resource contention", "The VM is off", "On weekends"], a: 1, e: "Shares decide priority under contention." }
          ]
        },
        {
          title: "Cluster",
          terms: [
            { t: "High availability", d: "vSphere HA: if a host fails, its VMs restart automatically on the other hosts. Admission Control reserves capacity (e.g. a percentage) so there's room to restart them." },
            { t: "Heartbeat Datastore", d: "HA uses datastore heartbeats as a second channel to tell a failed host apart from an isolated/partitioned one." },
            { t: "EVC", d: "Enhanced vMotion Compatibility: masks CPU features to a common baseline, so you can vMotion between hosts with different CPU generations." },
            { t: "Fault Tolerance", d: "FT runs a live shadow copy of a VM on another host in lockstep. Zero downtime and zero data loss on host failure." },
            { t: "DRS, DRS Rules", d: "Distributed Resource Scheduler balances load by vMotioning VMs (manual/partial/fully automated). Rules control VM placement." },
            { t: "vCLS", d: "vSphere Cluster Services: small agent VMs that keep DRS/HA cluster services running even if vCenter is down." },
            { t: "Affinity Rules", d: "Keep VMs together (affinity), keep them apart (anti-affinity, e.g. two DCs), or tie VMs to a group of hosts (VM-Host rules)." },
            { t: "Ballooning", d: "VMware Tools inflates a 'balloon' driver inside the guest to reclaim RAM the guest isn't using, when the host is under pressure or a limit is hit." }
          ],
          quiz: [
            { q: "A host crashes. Which feature restarts its VMs elsewhere?", o: ["DRS", "HA", "EVC", "vMotion"], a: 1, e: "HA restarts them. (It's a restart, not a live move.)" },
            { q: "Two domain controllers must never run on the same host:", o: ["Affinity rule", "Anti-affinity rule", "EVC", "FT"], a: 1, e: "VM-VM anti-affinity." },
            { q: "You can't vMotion between old and new CPU hosts. Enable…", o: ["EVC", "FT", "Ballooning", "Shares"], a: 0, e: "EVC sets a common CPU baseline." }
          ]
        }
      ],
      activities: [
        {
          type: "sort", title: "Which feature?", desc: "Match each situation to the vSphere feature that handles it.",
          buckets: ["HA", "DRS", "vMotion", "FT"],
          items: [
            { text: "Host crashed, restart its VMs", b: 0 }, { text: "Admission control", b: 0 }, { text: "Heartbeat datastore", b: 0 },
            { text: "Balance load across hosts", b: 1 }, { text: "Anti-affinity rules", b: 1 },
            { text: "Move a running VM manually", b: 2 }, { text: "Live-copy a VM's memory to another host", b: 2 },
            { text: "Zero-downtime shadow VM", b: 3 }
          ]
        },
        {
          "type": "match",
          "title": "Resource Controls",
          "desc": "Click a feature, then click what it does.",
          "pairs": [
            [
              "Reservation",
              "Guaranteed minimum"
            ],
            [
              "Limit",
              "Hard cap, even when the host is idle"
            ],
            [
              "Shares",
              "Priority only under contention"
            ],
            [
              "Ballooning",
              "Reclaims guest RAM via VMware Tools"
            ],
            [
              "EVC",
              "Common CPU baseline for vMotion"
            ],
            [
              "FT",
              "Live shadow VM in lockstep"
            ],
            [
              "vCLS",
              "Keeps cluster services alive"
            ]
          ]
        },
        {
          "type": "truefalse",
          "title": "vSphere Myths",
          "desc": "True or false? 3 lives ❤️❤️❤️.",
          "items": [
            {
              "s": "A VMware snapshot is a backup.",
              "ok": false,
              "e": "It depends on the base disk. Keep snapshots short-lived."
            },
            {
              "s": "HA restarts the VMs of a failed host on other hosts.",
              "ok": true,
              "e": "A restart, not a live move."
            },
            {
              "s": "DRS balances load by moving VMs with vMotion.",
              "ok": true,
              "e": "Manual, partially or fully automated."
            },
            {
              "s": "Shares matter even when there's no contention.",
              "ok": false,
              "e": "Shares only kick in under contention."
            },
            {
              "s": "An anti-affinity rule can keep two DCs on different hosts.",
              "ok": true,
              "e": "VM-VM anti-affinity."
            },
            {
              "s": "EVC lets you vMotion between different CPU generations.",
              "ok": true,
              "e": "It masks CPU features to a baseline."
            }
          ]
        },
        {
          "type": "connections",
          "title": "vSphere Connections",
          "desc": "Find 4 groups of 4. Select four tiles and hit Submit. 4 mistakes allowed!",
          "groups": [
            {
              "name": "Cluster features",
              "items": [
                "HA",
                "DRS",
                "FT",
                "EVC"
              ]
            },
            {
              "name": "Resource controls",
              "items": [
                "SHARES",
                "LIMIT",
                "RESERVATION",
                "BALLOONING"
              ]
            },
            {
              "name": "ESXi management",
              "items": [
                "ESXCLI",
                "DCUI",
                "HOST PROFILE",
                "LOCKDOWN"
              ]
            },
            {
              "name": "Deploying VMs",
              "items": [
                "TEMPLATE",
                "OVA",
                "OVF",
                "CUSTOMIZATION SPEC"
              ]
            }
          ]
        },
        {
          "type": "wordguess",
          "title": "vSphere Word Guess",
          "desc": "Guess the vSphere word in 6 tries.",
          "words": [
            {
              "w": "VMOTION",
              "hint": "Moves a running VM"
            },
            {
              "w": "CLUSTER",
              "hint": "A group of hosts"
            },
            {
              "w": "BALLOON",
              "hint": "Reclaims guest memory"
            },
            {
              "w": "LIMIT",
              "hint": "A hard cap"
            }
          ]
        },
        {
          "type": "pinpoint",
          "title": "Pinpoint",
          "desc": "Guess the term from as few clues as you can!",
          "puzzles": [
            {
              "clues": [
                "Cluster",
                "Heartbeat datastore",
                "Admission control",
                "Host fails",
                "Restart elsewhere"
              ],
              "answers": [
                "ha",
                "high availability",
                "vsphere ha"
              ],
              "reveal": "vSphere HA restarts VMs after a host failure."
            },
            {
              "clues": [
                "Balance",
                "Automation level",
                "Rules",
                "vMotion",
                "Distributed Resource Scheduler"
              ],
              "answers": [
                "drs"
              ],
              "reveal": "DRS balances load across the cluster."
            }
          ]
        },
        {
          "type": "blitz",
          "title": "Term Blitz",
          "desc": "60 seconds! Read the definition and hit the matching term. Score 10 to win.",
          "target": 10
        }
      ],
      labs: [
        {
          title: "Virtualization lab", he: "מעבדת וירטואליזציה", kind: "internal",
          desc: "General rules: every component you touch must stay connected, unless stated otherwise. Try alone first, then ask for help. Be bold and experiment.",
          steps: [
            "Remove a VM from the inventory, then add it back.",
            "Delete a VM.",
            "Enable DRS in the cluster.",
            "Enable HA in the cluster: set Admission Control to 85% and make sure it's enabled. Power on a VM and check that it does NOT power on. If it does, raise the percentages.",
            "Put a host into Maintenance Mode and wait for all its VMs to vMotion away.",
            "Take the host out of Maintenance Mode, then go to Cluster → DRS → Run DRS.",
            "Power off an ESX that has running VMs, and watch the VMs start on another host.",
            "Move an ESX between clusters.",
            "Enable SSH on a host through the vSphere Client (Security Profile).",
            "vMotion a VM manually.",
            "Change an ESX's time settings (NTP).",
            "Enable hot-add of memory and CPU.",
            "Reserve all of a VM's RAM.",
            "Give another VM a 1 GB memory limit. Go to its Performance tab, wait 5 minutes, and look at the RAM: you should see ballooning.",
            "Change the swapfile datastore: in the cluster settings, and on the hosts (one host in Maintenance Mode and one not).",
            "Share disks between 2 servers, following the Oracle RAC installation procedure."
          ]
        },
        { title: "VMware Hands-on Labs", kind: "external", url: "https://labs.hol.vmware.com/", desc: "Practice HA, DRS, vMotion and host management in a full vSphere lab." }
      ],
      test: { url: "", questions: [] }
    },
    {
      id: "commvault", num: 13, title: "Commvault Backups", he: "גיבויים Commvault", duration: "1.5 weeks", mode: "Theory + Lab",
      icon: "🛟", color: "#E6582E",
      intro: "Commvault protects the team's servers and VMs. Learn its building blocks, the kinds of backups and restores, and the advanced features, then back up and restore a real SQL server.",
      sections: [
        {
          title: "Basics",
          terms: [
            { t: "CommServe", d: "The brain of a CommCell: the central server with the database of every job, client, policy and schedule. It coordinates all operations." },
            { t: "MediaAgent", d: "The data mover. It receives backup data from clients and writes it to libraries (disk/cloud/tape), handles dedup, and reads it back on restore." },
            { t: "Client", d: "Any machine or entity being protected (server, VM, database instance) and registered in the CommCell." },
            { t: "Agent", d: "An iDataAgent: software on the client for a specific data type (File System, SQL, Oracle, Virtual Server Agent for VMs…)." },
            { t: "Disk Library", d: "Disk storage (mount paths) where MediaAgents write backup data." },
            { t: "Storage Policy", d: "Defines WHERE backup data goes (library/MediaAgent), how long it's kept (retention), and its copies (primary, secondary, DR)." },
            { t: "Schedule Policy", d: "Defines WHEN backups run (e.g. incremental every 15 minutes, full every night) and which clients/subclients it applies to." },
            { t: "Plan", d: "The modern, simplified object in Command Center that combines storage + retention + schedule (RPO) in one place." },
            { t: "Command Center", d: "Commvault's web-based admin console (the modern UI)." },
            { t: "CommCell Console", d: "The classic Java-based admin console. Full control over every setting." },
            { t: "HyperScale", d: "Commvault's scale-out appliance/software that combines MediaAgents and storage into one cluster." }
          ],
          quiz: [
            { q: "Which component actually writes backup data to disk?", o: ["CommServe", "MediaAgent", "Command Center", "Plan"], a: 1, e: "The MediaAgent moves the data. The CommServe only coordinates." },
            { q: "Retention and backup destination are defined in a…", o: ["Schedule Policy", "Storage Policy", "Agent", "Client group"], a: 1, e: "Storage Policy = where + how long. Schedule = when." },
            { q: "What is the central database and coordinator of a CommCell?", o: ["CommServe", "Disk Library", "HyperScale", "Agent"], a: 0, e: "CommServe." }
          ]
        },
        {
          title: "Backup types",
          terms: [
            { t: "Crash consistent", d: "Captures the disk as if the power were pulled: no app coordination. Usually recoverable, but in-flight transactions may need recovery." },
            { t: "Application aware", d: "Coordinates with the application (VSS / SQL / Oracle) so it's quiesced and consistent, with logs handled correctly." },
            { t: "IntelliSnap", d: "Uses storage array snapshots (e.g. NetApp) for near-instant backups, then optionally copies the snapshot to backup storage." },
            { t: "Streaming Backup", d: "Classic backup: data is read from the client and streamed through the MediaAgent to the library." }
          ],
          quiz: [
            { q: "A backup of a SQL VM must be consistent for the database. Use…", o: ["Crash consistent", "Application aware", "Neither", "A VMware snapshot only"], a: 1, e: "Application-aware quiesces SQL through VSS." },
            { q: "Which method leverages NetApp snapshots for fast backups?", o: ["Streaming", "IntelliSnap", "Synthetic full", "Data aging"], a: 1, e: "IntelliSnap." }
          ]
        },
        {
          title: "Restore types",
          terms: [
            { t: "Cluster backup / restore", d: "Protecting clustered applications (e.g. a SQL cluster) through the virtual cluster client, so it works no matter which node is active." },
            { t: "Transaction log", d: "Log backups (e.g. SQL every 15 minutes) allow point-in-time restore between full and differential backups." },
            { t: "Live mount", d: "Runs a VM straight from the backup copy (no full restore), for quick testing or file recovery." },
            { t: "Live recovery", d: "Powers the VM on from backup storage right away, while the data is moved back to production in the background." },
            { t: "In place / Out of place", d: "In place = overwrite the original location. Out of place = restore to a different server/path/name (safer: the original stays untouched)." }
          ],
          quiz: [
            { q: "Restore a server next to the original, without touching it:", o: ["In place", "Out of place", "Data aging", "Synthetic full"], a: 1, e: "Out-of-place restore (שחזור הצידה)." },
            { q: "Restore a DB to 10:37 this morning. You need…", o: ["Only the last full", "Full + transaction log backups", "Live mount", "A plan"], a: 1, e: "Logs enable point-in-time recovery." }
          ]
        },
        {
          title: "Advanced",
          terms: [
            { t: "Array management", d: "Registers storage arrays (e.g. NetApp) in Commvault so IntelliSnap can create and manage hardware snapshots." },
            { t: "Data aging", d: "The process that removes backup jobs that are past their retention and frees the space. It runs daily by default." },
            { t: "GDP", d: "Global Deduplication Policy: a shared dedup store (DDB) that several storage policies use, so data is deduplicated across all of them." }
          ],
          quiz: [
            { q: "Which process frees space by deleting expired backups?", o: ["Data aging", "Synthetic full", "IntelliSnap", "Live mount"], a: 0, e: "Data aging prunes jobs past their retention." },
            { q: "Several storage policies should dedupe against one store:", o: ["GDP", "Plan", "Client group", "Array management"], a: 0, e: "Global Deduplication Policy." }
          ]
        }
      ],
      activities: [
        {
          type: "sort", title: "Who does what?", desc: "Sort each job to the Commvault component responsible.",
          buckets: ["CommServe", "MediaAgent", "Agent (client)"],
          items: [
            { text: "Holds the job database", b: 0 }, { text: "Schedules and coordinates jobs", b: 0 },
            { text: "Writes data to the disk library", b: 1 }, { text: "Deduplication DDB", b: 1 },
            { text: "Reads the SQL database on the server", b: 2 }, { text: "Installed on the protected server", b: 2 }
          ]
        },
        {
          "type": "match",
          "title": "Who's Who",
          "desc": "Click a component, then click its role.",
          "pairs": [
            [
              "CommServe",
              "Job database & coordination"
            ],
            [
              "MediaAgent",
              "Moves data to the library"
            ],
            [
              "Agent",
              "Protects one data type on a client"
            ],
            [
              "Storage Policy",
              "Where data goes & how long it's kept"
            ],
            [
              "Schedule Policy",
              "When backups run"
            ],
            [
              "Data aging",
              "Deletes expired jobs"
            ],
            [
              "IntelliSnap",
              "Backups via array snapshots"
            ]
          ]
        },
        {
          "type": "truefalse",
          "title": "Backup Myths",
          "desc": "True or false? 3 lives ❤️❤️❤️.",
          "items": [
            {
              "s": "The CommServe writes backup data to disk.",
              "ok": false,
              "e": "The MediaAgent does. The CommServe coordinates."
            },
            {
              "s": "An out-of-place restore leaves the original untouched.",
              "ok": true,
              "e": "Safer: restore next to the original."
            },
            {
              "s": "Transaction log backups enable point-in-time restore.",
              "ok": true,
              "e": "Full/diff + logs up to the exact minute."
            },
            {
              "s": "Crash-consistent backups coordinate with SQL through VSS.",
              "ok": false,
              "e": "That's application-aware. Crash-consistent = power-pull state."
            },
            {
              "s": "Live mount runs a VM straight from the backup copy.",
              "ok": true,
              "e": "No full restore needed first."
            }
          ]
        },
        {
          "type": "wordguess",
          "title": "Backup Word Guess",
          "desc": "Guess the Commvault word in 6 tries.",
          "words": [
            {
              "w": "AGENT",
              "hint": "Protects one data type on a client"
            },
            {
              "w": "CLIENT",
              "hint": "A protected machine"
            },
            {
              "w": "AGING",
              "hint": "Data ___ deletes expired jobs"
            },
            {
              "w": "PLAN",
              "hint": "Storage + retention + schedule in one"
            }
          ]
        },
        {
          "type": "pinpoint",
          "title": "Pinpoint",
          "desc": "Guess the term from as few clues as you can!",
          "puzzles": [
            {
              "clues": [
                "CommCell",
                "Database",
                "Coordinates jobs",
                "Central server",
                "The brain"
              ],
              "answers": [
                "commserve",
                "comm serve"
              ],
              "reveal": "The CommServe is the CommCell's brain."
            },
            {
              "clues": [
                "Disk library",
                "Data mover",
                "Dedup DDB",
                "Writes the backup",
                "Media"
              ],
              "answers": [
                "mediaagent",
                "media agent"
              ],
              "reveal": "The MediaAgent moves data to storage."
            }
          ]
        },
        {
          "type": "blitz",
          "title": "Term Blitz",
          "desc": "60 seconds! Read the definition and hit the matching term. Score 10 to win.",
          "target": 10
        }
      ],
      labs: [
        {
          title: "Commvault lab", he: "מעבדת Commvault", kind: "internal",
          desc: "Back up and restore a real SQL server, then do an out-of-place restore of a VM.",
          steps: [
            "Storage policy: create StoragePolicies for the SQL servers you'll back up next. Hint: look at the existing storage policies and how other servers are set up. Get your mentor's approval when you finish.",
            "SQL backup: ask your mentor for a SQL server to use for testing.",
            "Install the agent on the server and check that it appears under Clients in the CommCell Console.",
            "Run a manual backup. Did it work? Great. If not, fix it.",
            "Create a schedule policy called `lab_commvault`: incremental every 15 minutes, full every night at 00:00.",
            "Next day: check that all the backups ran. If not, fix it.",
            "SQL restore: tell the server's owner you're about to restore it, and ask them to delete a table in the DB.",
            "Restore the server to the last full backup (00:00, in your own test). Check that the deleted table came back. If not, fix it.",
            "With a ticket: delete the schedule policy and remove the agent from the server.",
            "Out-of-place VM restore (שחזור הצידה): find the backup of the team's dev management server.",
            "Create a file named after yourself on the management server, and remember where you put it.",
            "With a ticket: restore it out of place from the last full backup (from BEFORE you created the file), with an unused IP in the management segment.",
            "Check that the restore worked: connect to the new IP. Is your file there? (It shouldn't be!) If it is, fix it.",
            "Ask the virtualization team to delete the restored server (with a ticket)."
          ]
        },
        { title: "Commvault documentation", kind: "external", url: "https://documentation.commvault.com/", desc: "Official docs for every concept in this chapter: storage policies, plans, agents, IntelliSnap and restores." }
      ],
      test: { url: "", questions: [] }
    },
    {
      id: "final-lab", num: 14, title: "Final Lab – Break & Fix", he: "מעבדה סופית", duration: "2 weeks", mode: "Break + Fix",
      icon: "🛠️", color: "#59C059",
      intro: "The boss level! The trainers break things in your lab environment (network, storage, virtualization, backups) and you find and fix them. Everything you've learned comes together here.",
      sections: [],
      activities: [],
      labs: [
        { title: "Break & fix scenarios", he: "שבירה + תיקון מעבדה", kind: "internal", desc: "Placeholder: the trainers will add the scenarios. Tip: work methodically. Physical → network → storage → virtualization → application. Check the logs, and change one thing at a time.", steps: [] }
      ],
      test: null
    },
    {
      id: "shift-week", num: 15, title: "Shift & Office Week", he: "שבוע משמרת + משרד", duration: "1 week", mode: "Shift + Office",
      icon: "🎓", color: "#FF6680",
      intro: "Spend a week on shift plus office days. See how incidents arrive, how they're handled, and how the systems you learned look in production. Congratulations, you made it! 🎉",
      sections: [],
      activities: [],
      labs: [
        {
          title: "Shift week checklist", kind: "checklist", desc: "Things to see and ask during the week.",
          steps: [
            "Join a shift and watch how alerts and tickets come in.",
            "Follow at least one incident from start to finish.",
            "Learn the escalation path: who calls CloudCore, and when?",
            "Write down 3 things you'd improve from the CloudCore side.",
            "Celebrate: you finished the CloudCore training! 🥳"
          ]
        }
      ],
      test: null
    }
  ]
};
