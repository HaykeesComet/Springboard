def print_upper_words(words, must_start_with):
    """Print each word on sep line, uppercased, if starts with one of given

    For example:
        print_upper_words(["hello", "hey", "goodbye", "yo", "yes"], must_start_with=["h", "y"])

    Should print:
        EDWARD
        ALFRED
    """

    for word in words:
        for letter in must_start_with:
            if word.startswith(letter):
                print(word.upper())
                break

print_upper_words(["hello", "hey", "goodbye", "yo", "yes"], must_start_with=["h", "y"])