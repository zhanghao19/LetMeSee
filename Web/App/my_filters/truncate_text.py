def truncate_text(text):
    if len(text) > 19:
        new_text = text[0:17] + "..."
        return new_text
    else:
        return text
