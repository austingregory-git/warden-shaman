export const data = {
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
    children: [
        {
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
            children: [
                {
                    name: "Violent Lightning",
                    image: "ViolentLightningIcon.jpg",
                    type: "passive",
                    requirements: ["Requires Shaman"],
                    currentPoints: 0,
                    maxPoints: 2,
                    tier: 3,
                    status: 'unavailable',
                    description: "Taking damage and casting abilities while [Storm Shield] is active has a 3/6% chance to automatically emit a [Chain Lightning] to the attacker or the target. 2 second internal CD on damage taken",
                    children: [
                        {
                            name: "Evoke the Storm",
                            image: "ViolentLightningIcon.jpg",
                            type: "passive",
                            requirements: ["Requires Shaman"],
                            currentPoints: 0,
                            maxPoints: 1,
                            tier: 4,
                            status: 'unavailable',
                            description: "[Evoke the Storm]: Critical strikes have a chance to make your next [Lightning Bolt] or [Chain Lightning] instant cast, free, and empowered. Proc lasts 12 seconds."
                            
                        },
                        {
                            name: "Chains of Devastation",
                            image: "IceColdWaterIcon.jpg",
                            type: "passive",
                            requirements: ["Requires Shaman"],
                            currentPoints: 0,
                            maxPoints: 1,
                            tier: 4,
                            status: 'unavailable',
                            description: "[Chain Lightning] casts make your next [Chain Heal] cast instant, and vice versa"
                        }
                    ]
                },
                {
                    name: "Ice Cold Water",
                    image: "IceColdWaterIcon.jpg",
                    type: "passive",
                    requirements: ["Requires Shaman"],
                    currentPoints: 0,
                    maxPoints: 1,
                    tier: 3,
                    status: 'unavailable',
                    description: "Taking damage and casting abilities while [Ice Shield] is active has a chance to make your next [Healing Surge] an instant cast, free, and empowered. Proc lasts 12 seconds. 2 second internal CD on damage taken",
                    children: [
                        {
                            name: "Chains of Devastation",
                            image: "IceColdWaterIcon.jpg",
                            type: "passive",
                            requirements: ["Requires Shaman"],
                            currentPoints: 0,
                            maxPoints: 1,
                            tier: 4,
                            status: 'unavailable',
                            description: "[Chain Lightning] casts make your next [Chain Heal] cast instant, and vice versa",
                        },
                        {
                            name: "Emerald Totem",
                            image: "ViolentLightningIcon.jpg",
                            type: "ability",
                            abilityDetails: ["Instant", "1 min cooldown"],
                            requirements: ["Requires Shaman"],
                            currentPoints: 0,
                            maxPoints: 1,
                            tier: 4,
                            status: 'unavailable',
                            description: "Summons a totem at your feet for 15 sec that collects power from all damage you take. When the totem expires or dies, the stored power is released, dealing damage to all enemies within 10 yards for 10% of all damage taken while it was active, divided evenly among targets",
                        }
                    ]
                }
            ]
        },
        {
            name: "Earth Shock",
            image: "EarthShockIcon.jpg",
            type: "ability",
            abilityDetails: ["Instant", "6 sec cooldown", "40 yd range"],
            requirements: ["Requires Shaman"],
            currentPoints: 0,
            maxPoints: 1,
            tier: 2,
            status: 'unavailable',
            description: "Instantly shocks the target with concussive force, causing nature damage. [Earth Shock] will consume all stacks of [Fulmination] (max 20) for additional damage. Blocks, Parries, Absorbs, and [Earthen Strike] all add a stack of [Fulmination].",
            children: [
                {
                    name: "Rumble",
                    image: "RumbleIcon.jpg",
                    type: "passive",
                    requirements: ["Requires Shaman"],
                    currentPoints: 0,
                    maxPoints: 1,
                    tier: 3,
                    status: 'unavailable',
                    description: "When [Earth Shock] is used at 20 stacks of [Fulmination], an [Earthquake] is spawned at the target’s location and the target deals 5% reduced damage for 8 seconds",
                    children: [
                        {
                            name: "Emerald Totem",
                            image: "ViolentLightningIcon.jpg",
                            type: "ability",
                            abilityDetails: ["Instant", "1 min cooldown"],
                            requirements: ["Requires Shaman"],
                            currentPoints: 0,
                            maxPoints: 1,
                            tier: 4,
                            status: 'unavailable',
                            description: "Summons a totem at your feet for 15 sec that collects power from all damage you take. When the totem expires or dies, the stored power is released, dealing damage to all enemies within 10 yards for 10% of all damage taken while it was active, divided evenly among targets",
                        }
                    ]
                },
                {
                    name: "Sundering",
                    image: "SunderingIcon.jpg",
                    type: "ability",
                    abilityDetails: ["Instant", "40 sec cooldown"],
                    requirements: ["Requires Shaman", "Requires Melee Weapon"],
                    currentPoints: 0,
                    maxPoints: 1,
                    tier: 3,
                    status: 'unavailable',
                    description: "Shatters a line of earth in front of you with your main hand weapon, dealing Flamestrike damage and Incapacitating any enemy hit for 2 sec.",
                    children: [
                        {
                            name: "Emerald Totem",
                            image: "ViolentLightningIcon.jpg",
                            type: "ability",
                            abilityDetails: ["Instant", "1 min cooldown"],
                            requirements: ["Requires Shaman"],
                            currentPoints: 0,
                            maxPoints: 1,
                            tier: 4,
                            status: 'unavailable',
                            description: "Summons a totem at your feet for 15 sec that collects power from all damage you take. When the totem expires or dies, the stored power is released, dealing damage to all enemies within 10 yards for 10% of all damage taken while it was active, divided evenly among targets",
                        },
                        {
                            name: "Molten Cleave",
                            image: "ViolentLightningIcon.jpg",
                            type: "ability",
                            abilityDetails: ["Instant", "12 sec cooldown"],
                            requirements: ["Requires Shaman", "Requires Melee Weapon"],
                            currentPoints: 0,
                            maxPoints: 1,
                            tier: 4,
                            status: 'unavailable',
                            description: "Swing your shield in an arc in front of you, dealing Flamestrike damage to all enemies hit. Spreads and refreshes [Flame Shock] on up to 5 targets.",
                        }
                    ]
                }
            ]
        },
        {
            name: "Earthen Strike",
            image: "EarthenStrikeIcon.jpg",
            type: "ability",
            abilityDetails: ["Instant", "3 sec cooldown", "Melee range"],
            requirements: ["Requires Shaman"],
            currentPoints: 0,
            maxPoints: 1,
            status: 'unavailable',
            tier: 2,
            description: "Strike your target with your weapon, dealing a split between nature and physical damage. Grants a stack of [Fulmination].",
            children: [
                {
                    name: "Hotheaded",
                    image: "HotheadedIcon.jpg",
                    type: "passive",
                    requirements: ["Requires Shaman"],
                    currentPoints: 0,
                    maxPoints: 2,
                    tier: 3,
                    status: 'unavailable',
                    description: "Taking damage and casting abilities while [Lava Shield] is active has a 4/6% chance to increase haste by 2/3% for 10 seconds, stacking up to 5 times. 2 second internal CD on damage taken.",
                    children: [
                        {
                            name: "Molten Cleave",
                            image: "ViolentLightningIcon.jpg",
                            type: "ability",
                            abilityDetails: ["Instant", "12 sec cooldown"],
                            requirements: ["Requires Shaman", "Requires Melee Weapon"],
                            currentPoints: 0,
                            maxPoints: 1,
                            tier: 4,
                            status: 'unavailable',
                            description: "Swing your shield in an arc in front of you, dealing Flamestrike damage to all enemies hit. Spreads and refreshes [Flame Shock] on up to 5 targets.",
                        },
                        {
                            name: "Volcanic Eruption",
                            image: "ViolentLightningIcon.jpg",
                            type: "passive",
                            requirements: ["Requires Shaman"],
                            currentPoints: 0,
                            maxPoints: 1,
                            tier: 4,
                            status: 'unavailable',
                            description: "When [Rock Shield] or [Lava Shield] is changed after being [Infused], unleash a [Fire Nova] from your location, dealing fire damage to enemies within a 16 yard radius.",
                        },

                    ]
                },
                {
                    name: "Rock Splinters",
                    image: "RockSplintersIcon.jpg",
                    type: "ability",
                    requirements: ["Requires Shaman"],
                    currentPoints: 0,
                    maxPoints: 1,
                    tier: 3,
                    status: 'unavailable',
                    description: "[Earthen Strike] hits 2 additional targets while you are in an [Earthquake]. Note that each target hit by [Earthen Strike] grants a stack of [Fulmination].",
                    children: [
                        {
                            name: "Volcanic Eruption",
                            image: "ViolentLightningIcon.jpg",
                            type: "passive",
                            requirements: ["Requires Shaman"],
                            currentPoints: 0,
                            maxPoints: 1,
                            tier: 4,
                            status: 'unavailable',
                            description: "When [Rock Shield] or [Lava Shield] is changed after being [Infused], unleash a [Fire Nova] from your location, dealing fire damage to enemies within a 16 yard radius.",
                        },

                    ]
                }
            ]
        }
    ]
}