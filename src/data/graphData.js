const columnWidth = (window.innerWidth-150)/10
const rowHeight = window.innerHeight/10
const nodeRadius = 30

export const graphData = {
    nodes: [
        {
            id: "Boulder Toss",
            name: "Boulder Toss",
            image: "BoulderTossIcon.jpg",
            type: "ability",
            abilityDetails: ["Instant", "8 sec cooldown", "15 yd range"],
            requirements: ["Requires Shaman"],
            currentPoints: 0,
            maxPoints: 1,
            tier: 1,
            status: 'available',
            description: "Hurl a boulder at your target, dealing physical damage and spawning an [Earthquake] at the point of impact.",
            x: 6*columnWidth,
            y: 1*rowHeight,
            requirements: [""],
            activeLinks: 0,
            children: ["Shield Slam", "Earth Shock", "Earthen Strike"],

        },
        {
            id: "Shield Slam",
            name: "Shield Slam",
            image: "ShieldSlamIcon.jpg",
            type: "ability",
            abilityDetails: ["Instant", "12 sec cooldown", "Melee range"],
            requirements: ["Requires Shaman", "Requires Shield"],
            currentPoints: 0,
            maxPoints: 1,
            tier: 2,
            status: 'unavailable',
            description: "Slam your shield into your target, dealing damage and applying an effect based on the currently active [Elemental Shield]. Damage type is also based on the currently active [Elemental Shield] ([Rock Shield]: Physical, [Lava Shield]: Fire, [Storm Shield]: Nature, [Ice Shield]: Frost)\n\nIf [Rock Shield] is active, spawn an [Earthquake] under the target.\n\nIf [Lava Shield] is active, sear the target, leaving a burn which deals fire damage over 24 seconds.\n\n If [Storm Shield] is active, automatically cast a [Lightning Bolt] or [Chain Lightning] (whichever was cast most recently) at the target.\n\nIf [Ice Shield] is active, shatter the enemy’s defenses, increasing the damage you deal to the target by 10% for 10 seconds.\n\nIf no [Elemental Shield] is active, no additional effect occurs and the damage is physical.",
            x: 4*columnWidth,
            y: 2*rowHeight,
            requirements: ["Boulder Toss"],
            activeLinks: 0,
            children: ["Violent Lightning", "Ice Cold Water"],
        }
    ],
    links: [
        {source: "Boulder Toss", target: "Shield Slam"}
    ],
}