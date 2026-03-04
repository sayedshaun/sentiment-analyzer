# Mapping of model output to your labels
label_mapping = {
    "LABEL_0": "SP",  # Strongly Positive
    "LABEL_1": "WP",  # Weakly Positive
    "LABEL_2": "WN",  # Weakly Negative
    "LABEL_3": "SN",  # Strongly Negative
    "LABEL_4": "NU",  # Neutral
}

# Merge mapping: 5 → 3
merged_label_mapping = {
    "SP": "Positive",
    "WP": "Positive",
    "WN": "Negative",
    "SN": "Negative",
    "NU": "Neutral"
}
