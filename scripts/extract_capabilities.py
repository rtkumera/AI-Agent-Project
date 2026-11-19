"""Extract the capability fields the Command Center renders from the platform's capability file.

GET /api/admin/agent-domains/curriculum and .../coverage both answer from
backend/src/services/agentDomain/capabilities/curriculum.json (loaded by capabilityRecord.ts:117,
:133-135). The platform syncs neither response into this repo, so the page reads this extract
instead, and the extract records exactly which file and commit it came from.

Usage:
  python3 -I scripts/extract_capabilities.py <path/to/capabilities/curriculum.json> <platform-commit>

Copies fields; never computes, fills or defaults one. A field missing upstream stays missing.
"""
import hashlib
import json
import sys
from pathlib import Path

FIELDS = (
    "capability_id",
    "name",
    "classification",
    "implementation_state",
    "requirement_validation_state",
    "starting_autonomy",
    "max_permitted_autonomy",
    "max_autonomy_rationale",
    "human_decision",
    "required_tools",
    "release_behaviour",
)
OUT = Path(__file__).resolve().parent.parent / "data" / "curriculum.capabilities.json"


def main(src: str, commit: str) -> None:
    raw = Path(src).read_bytes()
    matrix = json.loads(raw)
    out = {
        "schema": "command-center.capabilities/v1",
        "source": {
            "file": "backend/src/services/agentDomain/capabilities/curriculum.json",
            "platform_commit": commit,
            "sha256": hashlib.sha256(raw).hexdigest(),
            "loaded_by": "backend/src/services/agentDomain/capabilityRecord.ts:117, :133-135",
            "serves": [
                "GET /api/admin/agent-domains/curriculum",
                "GET /api/admin/agent-domains/curriculum/coverage",
            ],
        },
        "domain_key": matrix.get("domain_key"),
        "accountable_human": matrix.get("accountable_human"),
        "agent_name": matrix.get("agent_name"),
        "researched_at": matrix.get("researched_at"),
        # Research order, unchanged. The page must not sort these.
        "capabilities": [{k: c[k] for k in FIELDS if k in c} for c in matrix["capabilities"]],
    }
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"wrote {OUT.name}: {len(out['capabilities'])} capabilities from {commit}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
