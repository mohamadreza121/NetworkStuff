import { makeReferenceSet, parseReferenceRows } from "@/content/reference/shared";

export const linuxReference = makeReferenceSet({
  platform: "Linux",
  defaultMode: "Shell",
  source: { label: "Linux manual pages", href: "https://man7.org/linux/man-pages/dir_all_alphabetic.html" },
  rows: parseReferenceRows(`
pwd|Navigation|Print the absolute path of the current working directory.||FOUNDATION||pwd
cd|Navigation|Change the shell working directory to another path.||FOUNDATION||cd /etc
ls|Navigation|List directory contents with ownership, permissions, size, and timestamp detail.||FOUNDATION||ls -lah
tree|Navigation|Render a recursive directory hierarchy for quick structural review.||FOUNDATION||tree -L 2
realpath|Navigation|Resolve a relative path or symbolic link to its canonical absolute path.||FOUNDATION||realpath ./inventory.yml
basename|Navigation|Strip directory components and return the final path element.||FOUNDATION||basename /etc/ssh/sshd_config
dirname|Navigation|Return the directory portion of a filesystem path.||FOUNDATION||dirname /etc/ssh/sshd_config
mkdir|Directories|Create one or more directories, including missing parent paths.||FOUNDATION||mkdir -p labs/ospf/configs
rmdir|Directories|Remove an empty directory without deleting contained files.||FOUNDATION||rmdir old-empty-dir
mktemp|Directories|Create a unique temporary file or directory safely.||JUNIOR||mktemp -d
touch|Files|Create an empty file or update an existing file timestamp.||FOUNDATION||touch change-notes.md
cp|Files|Copy files or directory trees while optionally preserving metadata.||FOUNDATION||cp -a configs configs.backup
mv|Files|Move or rename files and directories within or across filesystems.||FOUNDATION||mv router-old.cfg router-r1.cfg
rm|Files|Remove files or directory trees after confirming the exact target.||FOUNDATION|D|rm -- stale-output.txt
ln|Files|Create hard links or symbolic links between filesystem paths.||JUNIOR||ln -s releases/current config-current
readlink|Files|Inspect the target referenced by a symbolic link.||JUNIOR||readlink -f config-current
install|Files|Copy a file while setting destination mode and ownership atomically.||PROFESSIONAL||install -m 640 source.conf /etc/netpath/source.conf
stat|Files|Display detailed inode, ownership, permission, and timestamp metadata.||FOUNDATION||stat /etc/hosts
file|Files|Identify a file type by inspecting its content signature.||FOUNDATION||file capture.pcapng
find|Searching|Search directory trees by name, type, ownership, time, size, or action.||JUNIOR||find /etc -type f -name '*.conf'
locate|Searching|Search the system filename database for paths matching a pattern.||FOUNDATION||locate sshd_config
updatedb|Searching|Refresh the filename database used by locate.||JUNIOR||sudo updatedb
which|Searching|Show the executable path the shell will invoke for a command.||FOUNDATION||which python3
whereis|Searching|Locate binary, source, and manual-page paths for a command.||FOUNDATION||whereis tcpdump
grep|Searching|Filter text by fixed strings or regular-expression patterns.||FOUNDATION||grep -Rni 'router ospf' configs
rg|Searching|Search text recursively with fast ignore-aware defaults.||JUNIOR||rg -n '10.10.20.0/24' configs
cat|Viewing Files|Write complete file contents to standard output for short-file inspection.||FOUNDATION||cat /etc/os-release
less|Viewing Files|Page through long text with search and backward navigation.||FOUNDATION||less /var/log/syslog
more|Viewing Files|Page forward through text on minimal or legacy systems.||FOUNDATION|L|more /var/log/messages
head|Viewing Files|Display the first lines of a file or command output.||FOUNDATION||head -n 20 inventory.yml
tail|Viewing Files|Display the final lines of a file or command output.||FOUNDATION||tail -n 50 /var/log/syslog
tail -f|Logs|Follow newly appended log records in real time.||JUNIOR||tail -f /var/log/syslog
sort|Text Processing|Sort text records by lexical, numeric, keyed, or reverse order.||FOUNDATION||sort -u devices.txt
uniq|Text Processing|Collapse or count adjacent duplicate text records.||FOUNDATION||sort addresses.txt | uniq -c
cut|Text Processing|Extract delimited fields or character ranges from each input line.||JUNIOR||cut -d, -f1 inventory.csv
awk|Text Processing|Select records and transform fields with a compact data-processing language.||JUNIOR||awk '{print $1,$5}' interface-state.txt
sed|Text Processing|Apply scripted substitutions and line transformations to text streams.||JUNIOR||sed -n '1,40p' router.cfg
wc|Text Processing|Count lines, words, characters, or bytes in input.||FOUNDATION||wc -l devices.txt
tee|Text Processing|Copy standard input to both the terminal and one or more files.||JUNIOR||ip route | tee route-snapshot.txt
xargs|Text Processing|Build command arguments from standard input with controlled batching.||PROFESSIONAL||printf '%s\\n' r1 r2 | xargs -n1 echo
diff|Text Processing|Compare files or trees and report line-level differences.||FOUNDATION||diff -u before.cfg after.cfg
comm|Text Processing|Compare two sorted files as unique and shared line sets.||JUNIOR||comm -3 expected.txt observed.txt
tr|Text Processing|Translate, squeeze, or delete character sets in a text stream.||JUNIOR||tr '[:lower:]' '[:upper:]'
column|Text Processing|Align delimited text into readable terminal columns.||JUNIOR||column -t -s, inventory.csv
chmod|Permissions|Change file mode bits for owner, group, and other access.||FOUNDATION||chmod 640 inventory.yml
chown|Ownership|Change the user and optionally group owning a filesystem object.||FOUNDATION||sudo chown netops:netops inventory.yml
chgrp|Ownership|Change the group ownership of a file or directory.||FOUNDATION||chgrp netops shared.cfg
umask|Permissions|Display or set the process mask used for new file permissions.||JUNIOR||umask 027
getfacl|Permissions|Display POSIX access-control-list entries on files and directories.||PROFESSIONAL||getfacl shared-configs
setfacl|Permissions|Add, replace, or remove POSIX ACL entries.||PROFESSIONAL|D|setfacl -m g:netops:rw shared.cfg
id|Users|Display user and group identifiers for the current or named account.||FOUNDATION||id netops
whoami|Users|Print the effective user name of the current shell.||FOUNDATION||whoami
who|Users|List currently logged-in sessions and their terminals.||FOUNDATION||who
w|Users|Show logged-in users and the processes currently attached to sessions.||JUNIOR||w
groups|Groups|List the groups associated with a user account.||FOUNDATION||groups netops
getent|Users|Query configured identity, host, service, and network databases through NSS.||JUNIOR||getent hosts router1.example.net
useradd|Users|Create a local user account with explicit defaults.||JUNIOR|D|sudo useradd -m -s /bin/bash netops
usermod|Users|Modify local user attributes and supplementary group membership.||JUNIOR|D|sudo usermod -aG sudo netops
userdel|Users|Remove a local account and optionally its home directory.||JUNIOR|D|sudo userdel netops
passwd|Users|Set or rotate a local account password and password-aging state.||FOUNDATION|D|sudo passwd netops
ps|Processes|Display a snapshot of running processes and resource ownership.||FOUNDATION||ps aux --sort=-%cpu
top|Processes|Monitor processes, CPU, memory, and load interactively.||FOUNDATION||top
htop|Processes|Inspect and manage processes through an interactive color interface.||FOUNDATION||htop
pgrep|Processes|Find process IDs by executable name and selection criteria.||JUNIOR||pgrep -a sshd
pkill|Processes|Send a signal to processes selected by name or attributes.||JUNIOR|D|sudo pkill -HUP sshd
kill|Processes|Send a signal to a specific process ID.||JUNIOR|D|kill -TERM 4242
killall|Processes|Signal every process matching an executable name.||JUNIOR|D|sudo killall tcpdump
nice|Processes|Start a process with a selected CPU scheduling priority.||PROFESSIONAL||nice -n 10 ./collector.sh
renice|Processes|Change the scheduling priority of an existing process.||PROFESSIONAL||sudo renice 5 -p 4242
jobs|Shell|List background and suspended jobs owned by the current shell.||FOUNDATION||jobs -l
bg|Shell|Resume a suspended shell job in the background.||FOUNDATION||bg %1
fg|Shell|Bring a background or suspended shell job to the foreground.||FOUNDATION||fg %1
nohup|Shell|Keep a command running after its controlling terminal closes.||JUNIOR||nohup ./collect.sh >collect.log 2>&1 &
systemctl|Services|Inspect and control systemd services, sockets, targets, and unit state.||JUNIOR|D|systemctl status ssh --no-pager
journalctl|Logs|Query systemd journal records by unit, time, priority, boot, or field.||JUNIOR||journalctl -u ssh --since '15 min ago'
dmesg|Logs|Inspect kernel ring-buffer messages for drivers, links, and hardware events.||JUNIOR||dmesg --level=err,warn
uptime|System|Show system runtime and short-, medium-, and long-term load averages.||FOUNDATION||uptime
watch|Automation|Rerun a command at intervals and highlight changing output.||JUNIOR||watch -n 2 ip -s link show dev ens33
apt|Packages|Install, remove, and update packages on Debian-family systems.||JUNIOR|D|sudo apt update
apt-cache|Packages|Query Debian package metadata and dependency information without changing state.||JUNIOR||apt-cache policy tcpdump
dpkg|Packages|Inspect and manage individual Debian packages and the local package database.||JUNIOR|D|dpkg -l | grep openssh
dnf|Packages|Manage packages and repositories on current Fedora and RHEL-family systems.||JUNIOR|D|sudo dnf install tcpdump
yum|Packages|Manage packages on older RHEL-family systems and compatibility environments.||JUNIOR|L|sudo yum install tcpdump
rpm|Packages|Query or install RPM package files and validate package ownership.||JUNIOR|D|rpm -qf /usr/sbin/tcpdump
df|Disk|Report mounted filesystem capacity and inode utilization.||FOUNDATION||df -hT
du|Disk|Measure directory and file space consumption.||FOUNDATION||du -sh /var/log/*
lsblk|Storage|Display block devices, partitions, filesystems, and mount relationships.||JUNIOR||lsblk -f
blkid|Storage|Read filesystem type, label, and UUID metadata from block devices.||JUNIOR||sudo blkid
mount|Mounts|Display mounts or attach a filesystem at a mount point.||JUNIOR|D|mount | column -t
umount|Mounts|Detach a mounted filesystem after active users are cleared.||JUNIOR|D|sudo umount /mnt/captures
free|Memory|Report physical and swap memory usage in human-readable units.||FOUNDATION||free -h
lscpu|CPU|Display processor architecture, topology, virtualization, and feature flags.||FOUNDATION||lscpu
uname|Kernel|Display kernel name, release, architecture, and host information.||FOUNDATION||uname -a
hostname|System|Display or temporarily set the system host name.||FOUNDATION||hostname
hostnamectl|System|Inspect or persistently manage systemd host identity.||JUNIOR|D|hostnamectl status
date|System|Display or format the current system date and time.||FOUNDATION||date --iso-8601=seconds
timedatectl|System|Inspect time synchronization, timezone, and RTC state.||JUNIOR||timedatectl status
sysctl|Kernel|Read or change runtime kernel parameters such as IP forwarding.||PROFESSIONAL|D|sysctl net.ipv4.ip_forward
ip|Networking|Manage Linux interfaces, addresses, routes, neighbors, tunnels, rules, and namespaces.||JUNIOR||ip help
ip addr|IP Addressing|Display or configure IPv4 and IPv6 addresses on interfaces.||JUNIOR|D|ip -br addr show
ip link|Interfaces|Inspect or change interface administrative state, MTU, and link attributes.||JUNIOR|D|ip -details link show dev ens33
ip route|Routing|Inspect or modify IPv4 and IPv6 kernel forwarding tables.||JUNIOR|D|ip route show table main
ip neigh|ARP / Neighbors|Inspect or modify ARP and IPv6 neighbor-cache entries.||JUNIOR|D|ip neigh show dev ens33
ip rule|Routing|Inspect or modify policy-routing rule evaluation order.||PROFESSIONAL|D|ip rule show
ip netns|Networking|Create and operate isolated network namespaces for testing.||PROFESSIONAL|D|sudo ip netns list
bridge|Layer 2|Inspect and manage Linux bridge ports, forwarding databases, VLANs, and multicast state.||PROFESSIONAL|D|bridge link show
ss|Sockets|Inspect listening and established TCP, UDP, raw, and Unix sockets.||JUNIOR||sudo ss -tulpn
netstat|Sockets|Inspect legacy socket, route, and interface statistics on older hosts.||JUNIOR|L|netstat -tulpn
ifconfig|Interfaces|Inspect or configure interfaces on legacy net-tools installations.||JUNIOR|L|ifconfig -a
route|Routing|Inspect or modify the legacy kernel route table through net-tools.||JUNIOR|L|route -n
arp|ARP / Neighbors|Inspect or modify the legacy IPv4 ARP cache.||JUNIOR|L|arp -an
ping|Connectivity Testing|Test IPv4 or IPv6 reachability, latency, and packet loss with ICMP echo.||FOUNDATION||ping -c 4 1.1.1.1
ping6|Connectivity Testing|Test IPv6 reachability on systems retaining the separate ping6 command.||JUNIOR|L|ping6 -c 4 2001:4860:4860::8888
traceroute|Connectivity Testing|Discover the routed hop sequence toward a destination.||JUNIOR||traceroute -n 1.1.1.1
tracepath|Connectivity Testing|Trace hops and path MTU without requiring elevated privileges.||JUNIOR||tracepath 1.1.1.1
mtr|Connectivity Testing|Measure loss and latency continuously across every routed hop.||JUNIOR||mtr -rwzc 20 1.1.1.1
dig|DNS|Query DNS records with explicit servers, types, and diagnostic flags.||JUNIOR||dig @1.1.1.1 example.net A
nslookup|DNS|Perform basic forward and reverse DNS queries on widely available systems.||FOUNDATION||nslookup example.net
host|DNS|Run concise forward, reverse, and record-type DNS lookups.||FOUNDATION||host -t mx example.net
resolvectl|DNS|Inspect and query systemd-resolved DNS state per link.||JUNIOR||resolvectl status
nmcli|Interfaces|Inspect and configure NetworkManager connections and device state.||JUNIOR|D|nmcli device status
ethtool|Interfaces|Inspect NIC link detection, speed, duplex, offloads, and driver statistics.||JUNIOR|D|sudo ethtool ens33
tcpdump|Packet Capture|Capture packets with interface, protocol, host, port, and BPF filters.||JUNIOR||sudo tcpdump -ni ens33 port 53
tshark|Packet Capture|Read or capture packets with Wireshark display filters and field extraction.||PROFESSIONAL||tshark -r trace.pcapng -Y 'tcp.analysis.retransmission'
curl|HTTP Testing|Test HTTP, HTTPS, APIs, TLS negotiation, headers, and response timing.||JUNIOR||curl -sSvo /dev/null https://example.net
wget|File Transfer|Retrieve files or mirror HTTP and FTP resources non-interactively.||FOUNDATION||wget https://example.net/image.bin
nc|TCP / UDP|Open, listen on, or test arbitrary TCP and UDP ports.||JUNIOR||nc -vz 192.0.2.50 443
socat|TCP / UDP|Bridge sockets, files, pipes, serial devices, and TLS endpoints.||PROFESSIONAL||socat - TCP:192.0.2.50:443
nmap|Connectivity Testing|Discover hosts, open ports, service versions, and selected network behavior.||PROFESSIONAL||nmap -sT -sV 192.0.2.0/28
ssh|SSH|Open an encrypted interactive or command session to a remote system.||FOUNDATION||ssh netops@192.0.2.10
scp|File Transfer|Copy files over SSH using secure-copy syntax.||FOUNDATION||scp router.cfg netops@192.0.2.10:/tmp/
sftp|File Transfer|Transfer and manage files through an interactive SSH subsystem.||FOUNDATION||sftp netops@192.0.2.10
rsync|File Transfer|Synchronize file trees efficiently locally or over SSH.||JUNIOR|D|rsync -av --dry-run configs/ backup/configs/
iptables|Firewall|Inspect or manage legacy Linux netfilter tables and chains.||PROFESSIONAL|L,D|sudo iptables -L -n -v
nft|Firewall|Inspect and manage modern nftables tables, chains, sets, rules, and counters.||PROFESSIONAL|D|sudo nft -a list ruleset
ufw|Firewall|Manage a simplified host firewall policy on supported distributions.||JUNIOR|D|sudo ufw status verbose
firewall-cmd|Firewall|Inspect and manage firewalld zones, services, ports, and runtime state.||JUNIOR|D|sudo firewall-cmd --list-all
openssl|HTTP Testing|Inspect certificates, hashes, keys, and TLS handshakes from the shell.||PROFESSIONAL||openssl s_client -connect example.net:443 -servername example.net
tar|Compression|Create, inspect, and extract tar archives while preserving directory structure.||FOUNDATION||tar -czf configs.tgz configs/
gzip|Compression|Compress a file using gzip while replacing the original by default.||FOUNDATION|D|gzip capture.pcap
gunzip|Compression|Expand a gzip-compressed file.||FOUNDATION|D|gunzip capture.pcap.gz
zip|Compression|Create ZIP archives compatible with common desktop systems.||FOUNDATION||zip -r configs.zip configs/
unzip|Compression|List or extract files from a ZIP archive.||FOUNDATION||unzip -l configs.zip
crontab|Scheduling|Create and inspect per-user recurring command schedules.||JUNIOR|D|crontab -l
env|Environment|Display the current process environment or run a command with adjusted variables.||FOUNDATION||env | sort
export|Environment|Mark a shell variable for inheritance by child processes.||FOUNDATION||export ANSIBLE_INVENTORY=inventory.yml
history|Shell|Review commands recorded by the current interactive shell.||FOUNDATION||history 20
alias|Shell|Create or inspect shell command shortcuts for the current environment.||FOUNDATION||alias ll='ls -lah'
source|Shell|Execute a file in the current shell so variables and functions persist.||JUNIOR||source .venv/bin/activate
bash|Shell|Start Bash or execute a Bash script with explicit options.||FOUNDATION||bash -n deploy.sh
sudo|Users|Run a permitted command with another user's privileges, commonly root.||FOUNDATION|D|sudo -l
su|Users|Start a shell as another user after authentication.||JUNIOR|D|su - netops
sha256sum|Files|Calculate or verify SHA-256 file integrity checksums.||JUNIOR||sha256sum appliance-image.bin
`),
});
