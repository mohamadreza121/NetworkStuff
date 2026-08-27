import { makeReferenceSet, parseReferenceRows } from "@/content/reference/shared";

export const ansibleReference = makeReferenceSet({
  platform: "Ansible",
  defaultMode: "Shell",
  source: { label: "Ansible command-line tools", href: "https://docs.ansible.com/projects/ansible/latest/command_guide/index.html" },
  rows: parseReferenceRows(`
ansible PATTERN -m MODULE|Ad Hoc Commands|Run one module against inventory hosts selected by a pattern.|Shell|JUNIOR||ansible routers -m ansible.netcommon.cli_command -a 'command=show version'
ansible-playbook PLAYBOOK|Playbooks|Execute the plays and tasks defined in a YAML playbook.|Shell|JUNIOR||ansible-playbook playbooks/backup.yml
ansible-inventory --graph|Inventory|Display inventory groups and host relationships as a hierarchy.|Shell|JUNIOR||ansible-inventory -i inventory.yml --graph
ansible-inventory --host HOST|Inventory|Display the variables resolved for one inventory host.|Shell|PROFESSIONAL||ansible-inventory -i inventory.yml --host edge-r1
ansible-galaxy collection install COLLECTION|Collections|Install a namespaced collection and its modules, roles, and plugins.|Shell|JUNIOR||ansible-galaxy collection install cisco.ios
ansible-galaxy collection list|Collections|List installed collections and their resolved versions.|Shell|JUNIOR||ansible-galaxy collection list
ansible-vault encrypt FILE|Vault|Encrypt a file containing credentials or other sensitive variables.|Shell|PROFESSIONAL|D|ansible-vault encrypt group_vars/all/vault.yml
ansible-vault view FILE|Vault|Decrypt and display an encrypted vault file without modifying it.|Shell|PROFESSIONAL||ansible-vault view group_vars/all/vault.yml
ansible-doc MODULE|Documentation|Display local documentation, parameters, examples, and return values for a module.|Shell|JUNIOR||ansible-doc cisco.ios.ios_config
ansible-config dump|Configuration|Display active Ansible configuration settings and their resolved values.|Shell|PROFESSIONAL||ansible-config dump --only-changed
ansible-console|Interactive|Open an interactive shell for running ad hoc tasks against inventory hosts.|Shell|ADVANCED||ansible-console -i inventory.yml
ansible-pull -U URL|Execution|Pull a playbook repository and execute it locally on the managed node.|Shell|ADVANCED|D|ansible-pull -U https://github.com/example/network-automation.git local.yml
ansible-playbook --syntax-check|Validation|Parse a playbook and report syntax errors without executing its tasks.|Shell|JUNIOR||ansible-playbook playbooks/deploy.yml --syntax-check
ansible-playbook --check|Validation|Simulate supported tasks without applying their intended changes.|Shell|JUNIOR||ansible-playbook playbooks/deploy.yml --check
ansible-playbook --diff|Validation|Show before-and-after content for modules that support diff output.|Shell|PROFESSIONAL||ansible-playbook playbooks/deploy.yml --check --diff
ansible-playbook --list-hosts|Validation|Show which inventory hosts a playbook would target without executing tasks.|Shell|JUNIOR||ansible-playbook playbooks/deploy.yml --list-hosts
ansible-playbook --list-tasks|Validation|List playbook tasks in execution order without running them.|Shell|JUNIOR||ansible-playbook playbooks/deploy.yml --list-tasks
ansible-playbook --limit PATTERN|Targeting|Restrict a playbook run to a bounded subset of the selected inventory.|Shell|PROFESSIONAL||ansible-playbook playbooks/deploy.yml --limit edge_routers
ansible-playbook --tags TAGS|Targeting|Run only tasks carrying one or more selected tags.|Shell|PROFESSIONAL||ansible-playbook playbooks/deploy.yml --tags validation
ansible-playbook --skip-tags TAGS|Targeting|Exclude tasks carrying one or more selected tags from a run.|Shell|PROFESSIONAL||ansible-playbook playbooks/deploy.yml --skip-tags changes
ansible-playbook --start-at-task NAME|Recovery|Resume execution at a named task after reviewing earlier task state.|Shell|ADVANCED|D|ansible-playbook playbooks/deploy.yml --start-at-task 'Verify OSPF neighbors'
ansible-playbook --step|Validation|Prompt for confirmation before each task in a playbook run.|Shell|PROFESSIONAL||ansible-playbook playbooks/deploy.yml --step
ansible-playbook --vault-id ID|Vault|Select a named vault identity and password source for encrypted variables.|Shell|PROFESSIONAL||ansible-playbook playbooks/deploy.yml --vault-id prod@prompt
ansible-playbook -e KEY=VALUE|Variables|Provide an extra variable with the highest standard variable precedence.|Shell|PROFESSIONAL|D|ansible-playbook playbooks/deploy.yml -e change_window=true
ansible-playbook -vvvv|Troubleshooting|Run a playbook with highly verbose connection and task diagnostics.|Shell|PROFESSIONAL||ansible-playbook playbooks/deploy.yml -vvvv
ansible-config view|Configuration|Display the contents of the active Ansible configuration file.|Shell|JUNIOR||ansible-config view
ansible-galaxy role init NAME|Roles|Create the standard directory structure for a reusable Ansible role.|Shell|JUNIOR||ansible-galaxy role init network_backup
`),
});
