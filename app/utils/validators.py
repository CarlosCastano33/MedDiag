from typing import List


def validate_probability(value: float) -> float:
    if value < 0 or value > 1:
        raise ValueError("Probability must be between 0 and 1.")
    return round(float(value), 4)


def validate_required_features(features: dict, expected: List[str]) -> None:
    missing = [f for f in expected if f not in features]
    if missing:
        raise ValueError(f"Missing required features: {', '.join(missing)}")
