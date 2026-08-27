import { makeReferenceSet, parseReferenceRows } from "@/content/reference/shared";

export const gitReference = makeReferenceSet({
  platform: "Git",
  defaultMode: "Shell",
  source: { label: "Official Git reference", href: "https://git-scm.com/docs" },
  rows: parseReferenceRows(`
git init|Repository Setup|Create an empty Git repository or reinitialize an existing working tree.|Shell|JUNIOR||git init
git clone URL|Repository Setup|Copy a remote repository, its branches, and its history to the local system.|Shell|JUNIOR||git clone https://github.com/example/network-labs.git
git status|Inspection|Show the current branch plus staged, unstaged, and untracked file state.|Shell|JUNIOR||git status --short --branch
git add PATH|Staging|Add selected working-tree changes to the index for the next commit.|Shell|JUNIOR||git add configs/router1.cfg
git add --patch|Staging|Interactively select individual change hunks to add to the index.|Shell|PROFESSIONAL||git add --patch
git commit -m MESSAGE|History|Record staged changes as a new commit with an explanatory message.|Shell|JUNIOR||git commit -m "docs: add OSPF verification notes"
git log|Inspection|Display commit history with author, date, message, and parent relationships.|Shell|JUNIOR||git log --oneline --decorate --graph --all
git show OBJECT|Inspection|Display metadata and patch content for a commit, tag, or other object.|Shell|JUNIOR||git show HEAD
git diff|Inspection|Display unstaged working-tree changes relative to the index.|Shell|JUNIOR||git diff
git diff --staged|Inspection|Display staged changes relative to the current commit.|Shell|JUNIOR||git diff --staged
git branch|Branches|List local branches and identify the currently checked-out branch.|Shell|JUNIOR||git branch --verbose
git switch NAME|Branches|Change the working tree to an existing branch.|Shell|JUNIOR||git switch main
git switch -c NAME|Branches|Create a new branch at the current commit and switch to it.|Shell|JUNIOR||git switch -c feat/ospf-lab
git merge NAME|Branches|Integrate the named branch into the current branch and resolve conflicts if needed.|Shell|PROFESSIONAL||git merge feat/ospf-lab
git fetch REMOTE|Remotes|Download remote objects and update remote-tracking references without merging.|Shell|JUNIOR||git fetch origin --prune
git pull --ff-only|Remotes|Fetch and fast-forward the current branch without creating an automatic merge commit.|Shell|PROFESSIONAL||git pull --ff-only
git push REMOTE BRANCH|Remotes|Publish a local branch and its commits to a configured remote repository.|Shell|JUNIOR||git push -u origin feat/ospf-lab
git remote -v|Remotes|List configured remote names and their fetch and push URLs.|Shell|JUNIOR||git remote -v
git restore PATH|Recovery|Restore a working-tree file from the index and discard its unstaged changes.|Shell|PROFESSIONAL|D|git restore configs/router1.cfg
git restore --staged PATH|Recovery|Remove a path from the index while preserving its working-tree changes.|Shell|PROFESSIONAL||git restore --staged configs/router1.cfg
git reset --soft COMMIT|Recovery|Move the current branch while preserving changes in the index and working tree.|Shell|ADVANCED|D|git reset --soft HEAD~1
git reset --hard COMMIT|Recovery|Move the current branch and discard indexed and working-tree changes.|Shell|ADVANCED|D|git reset --hard HEAD~1
git revert COMMIT|Recovery|Create a new commit that reverses the selected commit without rewriting history.|Shell|PROFESSIONAL||git revert 2f1c4ab
git stash push|Work in Progress|Save tracked working-tree changes temporarily and return to a clean checkout.|Shell|JUNIOR||git stash push -m "wip acl lab"
git stash pop|Work in Progress|Apply the latest stash and remove it from the stash list if successful.|Shell|PROFESSIONAL|D|git stash pop
git tag NAME|Releases|Create a lightweight tag that names the current commit.|Shell|JUNIOR||git tag phase-4
git tag -a NAME|Releases|Create an annotated tag containing a message, author, and timestamp.|Shell|PROFESSIONAL||git tag -a v4.0.0 -m "Phase 4"
git blame PATH|Inspection|Show the most recent commit and author responsible for each line of a file.|Shell|PROFESSIONAL||git blame content/reference/cisco.ts
git worktree add PATH BRANCH|Branches|Check out another branch in a separate linked working directory.|Shell|ADVANCED||git worktree add ../netpath-review feat/netpath-phase-4
git cherry-pick COMMIT|History|Apply the change introduced by one commit onto the current branch.|Shell|ADVANCED|D|git cherry-pick 2f1c4ab
git rebase BRANCH|History|Replay current-branch commits on a new base and rewrite their commit identifiers.|Shell|ADVANCED|D|git rebase origin/main
git bisect start|Troubleshooting|Begin a binary search through commit history to locate a regression.|Shell|ADVANCED||git bisect start
git clean -nd|Recovery|Preview which untracked files and directories a clean operation would remove.|Shell|PROFESSIONAL||git clean -nd
git clean -fd|Recovery|Permanently remove untracked files and directories from the working tree.|Shell|ADVANCED|D|git clean -fd
`),
});
