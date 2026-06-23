package com.umamusume.calculator.model;

import java.time.LocalDate;

public class Banner {
    private final String id;
    private final String title;
    private final String type;
    private final LocalDate globalReleaseDate;

    public Banner(String id, String title, String type, LocalDate globalReleaseDate) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.globalReleaseDate = globalReleaseDate;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getType() {
        return type;
    }

    public LocalDate getGlobalReleaseDate() {
        return globalReleaseDate;
    }
}
