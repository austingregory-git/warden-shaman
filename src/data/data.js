export const data = {
    name: "Boulder Toss",
    image: "WardenShamanIcon.png",
    type: "ability",
    requirements: ["Requires Shaman"],
    description: "Hurl a boulder at your target, dealing physical damage and spawning an [Earthquake] at the point of impact.",
    children: [
        {
            name: "Shield Slam",
            image: "WardenShamanIcon.png",
            type: "ability",
            requirements: ["Requires Shaman", "Requires Shield"],
            description: "Slam your shield into your target, dealing damage and applying an effect based on the currently active [Elemental Shield]. Damage type is also based on the currently active [Elemental Shield] ([Rock Shield]: Physical, [Lava Shield]: Fire, [Storm Shield]: Nature, [Ice Shield]: Frost)\n\nIf [Rock Shield] is active, spawn an [Earthquake] under the target.\n\nIf [Lava Shield] is active, sear the target, leaving a burn which deals fire damage over 18 seconds.\n\nIf [Storm Shield] is active, your next [Lightning Bolt] or [Chain Lightning] is an instant cast, is free, and is empowered. Proc lasts 12 seconds.\n\nIf [Ice Shield] is active, shatter the enemy’s defenses, increasing the damage you deal to the target by 10% for 10 seconds.\n\nIf no [Elemental Shield] is active, no additional effect occurs and the damage is physical."
        },
        {
            name: "Earth Shock",
            image: "WardenShamanIcon.png",
            type: "ability",
            requirements: ["Requires Shaman"],
            description: "Instantly shocks the target with concussive force, causing nature damage. [Earth Shock] will consume all stacks of [Fulmination] (max 20) for additional damage. Blocks, Parries, Absorbs, and [Earthen Strike] all add a stack of [Fulmination]."
        },
        {
            name: "Earthen Strike",
            image: "EarthenStrikeIcon.jpg",
            type: "ability",
            requirements: ["Requires Shaman"],
            description: "Strike your target with your weapon, dealing a split between nature and physical damage. Grants a stack of [Fulmination].",
        }
    ]
}